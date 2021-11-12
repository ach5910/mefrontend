import {useRef} from "react";

export default function useDeepCompareDeps(val) {
    const ref = useRef([]);

    // JSON.stringify is used to compare objects because it doesn't compare function identities.
    // Using react-fast-compare's isEqual function will fail this comparison because it
    // evaluates React's internal dispatchAction function, used by useReducer and useState's callback function,
    // as different functions between renders. This appears to be a bug, currently no issues
    // on the react open source project address this inconsistency
    if (JSON.stringify(val) != JSON.stringify(ref.current)) {
        ref.current = val;
    }
    return ref.current;
}