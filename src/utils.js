import ResizeObserver from "resize-observer-polyfill";
import {useCallback, useEffect, useReducer, useRef, useState} from "react";

export function noop() {}

/**
 * Returns a number bounds to an inclusive upper and lower limit
 *
 * @param {number} val
 * @param {number} min lower bound
 * @param {number} max upper bound
 *
 * @returns {number}
 */
export function clamp(val, min = 0, max = 100) {
    return Math.min(Math.max(Number.parseInt(val, 10), min), max);
}

export function InvalidTypeException(expectedType) {
    this.message = `Invalid type, expected ${expectedType}`;
    this.name = "InvalidTypeException";
}

/**
 * @param {string} variableName snake-cased string
 *
 * @returns {string} string formatted to camel-case
 */
export function underscoresToCamelCase(variableName) {
    if (typeof variableName !== "string") {
        throw new InvalidTypeException("string");
    }
    const variableNameChunks = variableName.split("_");
    if (variableNameChunks.length > 1) {
        return variableNameChunks.reduce(
            (newVariableName, nameChunk, index) =>
                newVariableName +
                (index === 0 ? nameChunk.toLowerCase() : nameChunk[0].toUpperCase() + nameChunk.slice(1))
        );
    }
    return variableName;
}

/**
 * @param {Object} responseData snake-cased object
 *
 * @return {Object} object formatted to camel-case
 */
export function transformPythonResponse(responseData) {
    if (Array.isArray(responseData)) {
        return responseData.map(
            (item) => (typeof item === "object" && item !== null ? transformPythonResponse(item) : item),
            []
        );
    }
    if (typeof responseData === "object" && responseData !== null) {
        const newObject = {};
        Object.keys(responseData).forEach((oldKey) => {
            const newKey = underscoresToCamelCase(oldKey);
            const newVal = transformPythonResponse(responseData[oldKey]);
            newObject[newKey] = newVal;
        });
        return newObject;
    }
    return responseData;
}

export function logError(msg) {
    return function catchError(err) {
        console.log(msg, err);
    };
}

/**
 * @param {*} arr
 *
 * @returns {boolean}
 */
export function isNonemptyArray(arr) {
    return Array.isArray(arr) && arr.length > 0;
}

// The go-to sort((a, b) => return a-b) works almost everywhere but is still inconsistent
// in some browsers/environments. This method is implicit and eradicates the inconsistency
export function safeSort(a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
}

export function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("click", listener);

        return () => {
            document.removeEventListener("click", listener);
        };
    }, [ref, handler]);
}

export function useFocus() {
    const [focused, set] = useState(false);
    return {
        focused,
        bind: {
            onFocus: () => set(true),
            onBlur: () => set(false),
        },
    };
}

export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

/**
 * Hook that's used to observe changes to a components bounding client rect
 *
 * @return {Object:bind, Object:rect}
 */
export function useMeasure(connect = true) {
    const ref = useRef();
    const [bounds, set] = useState({left: 0, top: 0, width: 0, height: 0});
    const [ro] = useState(
        () =>
            new ResizeObserver(([entry]) => {
                set(entry.contentRect);
            })
    );
    useEffect(() => {
        if (connect) {
            ro.observe(ref.current);
        } else if (ro && ro.disconnect) {
            ro.disconnect();
        }
        return () => {
            if (ro && ro.disconnect) {
                ro.disconnect();
            }
        };
    }, [connect]);
    return [{ref}, bounds];
}

/**
 * Custom hooks that doesn't fire the callback when the component mounts.
 * Replicates the React class componentDidUpdate life cycle method.
 * @param {function} fn
 * @param {any[]} deps Dependencies
 */
export function useUpdateEffect(fn, deps) {
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            fn();
        } else {
            isMounted.current = true;
        }
    }, deps);
}

/**
 * Custom hook that sets up an interval and clears it after unmounting.
 * It’s a combo of setInterval and clearInterval tied to the component lifecycle.
 * 
 * @param {function} callback
 * @param {int} delay
 */
export function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    // eslint-disable-next-line consistent-return
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export function useStateObject(initState) {
    return useReducer((state, newState) => ({...state, ...newState}), initState);
}

export function useKeys(keyMap, deps = []) {
    const handleKey = useCallback((e) => {

        if (["INPUT", "TEXTAREA"].includes(e.target.nodeName)) return;
        // Check for macro keys
        let keyStr = ["shift", "ctrl", "alt", "meta"].reduce((acc, key) => {
            if (e[`${key}Key`]) {
                return `${acc}${key}+`;
            }
            return acc;
        }, "");
        keyStr = `${keyStr}${e.key}`;
        if (keyMap[keyStr]) {
            document.activeElement.blur();
            keyMap[keyStr]();

            // Check if a capital letter was given as 'shift+<letter>'
        } else if (keyStr.indexOf("+") > -1) {
            const [macro, letter] = keyStr.split("+");
            if (macro == "shift" && keyMap[letter]) {
                document.activeElement.blur();
                keyMap[letter]();
            }
        }
    }, deps);

    useEffect(() => {
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, deps);
}

export function getLineHeight(element) {
    let temp = document.createElement(element.nodeName);
    temp.className = element.className;
    temp.setAttribute("style", `margin:0px;padding:0px;`);
    if (temp.type == "textarea") temp.rows = 1;
    temp.innerHTML = "test";
    temp = element.parentNode.appendChild(temp);
    const ret = temp.clientHeight;
    temp.parentNode.removeChild(temp);
    return ret;
}

export function stopAllPropagation(e) {
    if (!e) return;
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) e.nativeEvent.stopImmediatePropagation();
}

// Rabin Karp text matching algorithm
// Return both boolean if the pattern (pat) and txt (text) are a match or not
export const rabinKarp = (pat, txt) => {
    const M = pat.length;
    const N = txt.length;
    const q = 31;
    const d = 256;
    let i;
    let j;
    let p = 0; // hash value for pattern
    let t = 0; // hash value for txt
    let h = 1;

    // The value of h would be "pow(d, M-1)%q"
    for (i = 0; i < M - 1; i += 1) {
        h = (h * d) % q;
    }

    // Calculate the hash value of pattern and first
    // window of text
    for (i = 0; i < M; i += 1) {
        p = (d * p + pat.charCodeAt(i)) % q;
        t = (d * t + txt.charCodeAt(i)) % q;
    }

    // Slide the pattern over text one by one
    for (i = 0; i <= N - M; i += 1) {
        // Check the hash values of current window of text
        // and pattern. If the hash values match then only
        // check for characters on by one
        if (p === t) {
            /* Check for characters one by one */
            for (j = 0; j < M; j += 1) {
                if (txt[i + j] !== pat[j]) break;
            }

            // if p == t and pat[0...M-1] = txt[i, i+1, ...i+M-1]
            if (j === M) {
                return true;
            }
        }

        // Calculate hash value for next window of text: Remove
        // leading digit, add trailing digit
        if (i < N - M) {
            t = (d * (t - txt.charCodeAt(i) * h) + txt.charCodeAt(i + M)) % q;

            // We might get negative value of t, converting it
            // to positive
            if (t < 0) t += q;
        }
    }
    return false;
};

const inputTypes = [
    window.HTMLInputElement,
    window.HTMLSelectElement,
    window.HTMLTextAreaElement,
];

/**
 * Programmatically trigger React's onChange handler
 * 
 * @param {Node} node 
 * @param {string} value 
 */
export const triggerInputChange = (node, value = '') => {

    // only process the change on elements we know have a value setter in their constructor
    if ( inputTypes.indexOf(node.__proto__.constructor) >-1 ) {

        // Get reference to the node's value setter
        const setValue = Object.getOwnPropertyDescriptor(node.__proto__, 'value').set;
        const event = new Event('input', { bubbles: true });

        // Update node.value then dispatch an event
        setValue.call(node, value);
        node.dispatchEvent(event);

    }
};