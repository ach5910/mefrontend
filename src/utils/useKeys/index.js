import { useEffect, useCallback } from "react";

/**
 * A hook used for key binding and keyboard short cuts. The keyMap is an object containing
 * keys combinations that have custom functions as their corresponding values.
 * 
 * @param {Object.<string,Function>} keyMap 
 * @param {[any]} deps 
 */
export default function useKeys(keyMap, deps = []) {
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