import { useEffect } from "react";
import useDeepCompareDeps from "../useDeepCompareDeps";

export default function useDeepEffect(callback, deps) {
    useEffect(callback, useDeepCompareDeps(deps));
}