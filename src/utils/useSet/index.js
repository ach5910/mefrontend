import {useState, useCallback} from "react";
import stopAllPropagation from "../stopAllPropagation";

export default function useSet(values){
    const [list, setList] = useState(values);
    const [set] = useState(() => new Set(values));

    const handleSelected = useCallback(
        (value) => (e) => {
            stopAllPropagation(e)
            if (set.has(value)){
                set.delete(value)
            } else {
                set.add(value);
            }
            setList([...set])
        },
        [set, setList]
    )

    return [list, handleSelected]
}