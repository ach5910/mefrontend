import { useReducer, useState } from "react";

/**
 * Creates an state object that will merge will with incoming setState changes.
 * 
 * @param {Object.<string,any>} initState 
 * 
 * @returns {[Object, Function]} Returns the state and the setState updater function
 */
export default function useStateObject(initState) {
    // const [initState] = useState(_initState)
    return useReducer((state, newState) => ({...state, ...newState}), initState);
}