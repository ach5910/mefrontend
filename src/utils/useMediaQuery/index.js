import {useState, useEffect} from "react";

export default function useMediaQuery(mediaQuery){
    const [queryIsValid, setQueryIsValid] = useState(!!window.matchMedia(mediaQuery).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(mediaQuery);
        function handleDocumentChange(){
            setQueryIsValid(!!mediaQueryList.matches)
        }
        mediaQueryList.addEventListener("change", handleDocumentChange);
        return () => mediaQueryList.removeEventListener("change", handleDocumentChange);
    },[mediaQuery, setQueryIsValid])

    return queryIsValid;
}