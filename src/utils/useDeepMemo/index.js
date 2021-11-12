import {useMemo} from "react";
import useDeepCompareDeps from "../useDeepCompareDeps";

export default function useDeepMemo(fn, deps){
    return useMemo(fn, useDeepCompareDeps(deps));
}