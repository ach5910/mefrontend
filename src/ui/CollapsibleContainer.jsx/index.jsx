import React, {useEffect, useRef} from "react";
import {bool, node} from "prop-types";
import {a, useSpring} from "react-spring";
import {useMeasure, usePrevious} from "../../utils";

const config = {mass: 1, tension: 450, friction: 25, clamp: true};

const CollapsibleContainer = ({isCollapsed, children}) => {
    const isMounting = useRef(true);

    const [bind, {height: h}] = useMeasure();
    const prevH = usePrevious(h);
    useEffect(() => {
        isMounting.current = false;
    }, []);

    const {height, o} = useSpring({
        height: isCollapsed ? 0 : h,
        o: isCollapsed ? 0 : 1,
        config,
        immediate: prevH != h || isMounting.current,
    })

    return (
        <a.div style={{height, overflow: o.to((v) => `${v < 1.0 ? "hidden" : "visible"}`)}}>
            <div {...bind}>{children}</div>
        </a.div>
    );
}

CollapsibleContainer.defaultProps = {
    isCollapsed: false
}

CollapsibleContainer.propTypes = {
    isCollapsed: bool,
    children: node.isRequired
}

export default CollapsibleContainer;