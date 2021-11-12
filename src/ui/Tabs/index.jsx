import React, { useRef, useCallback, useEffect } from 'react';
import {oneOf, shape, arrayOf, string, number, node, bool, func} from 'prop-types';
import { a, useSpring } from "react-spring";
import bem from "bembo";

import rippleClick from '../../utils/rippleClick';

import "../../styles/partials/_tab.scss";

const b = bem("tab");

const springConfig = {mass:1, tension: 300, friction: 25};

const Tabs = ({tabs, active,  throttle, handleClick}) => {
    const ref = useRef(null);
    const [spring, setSpring] = useSpring(() => ({x: 0, config: springConfig}))
    const timeoutId = useRef(null);

    useEffect(() => {
        const idx = tabs.findIndex((tab) => active == tab.value);
        // if (idx > 0){
            const w = ref.current.getBoundingClientRect().width;
            setSpring({x: idx * (w / tabs.length),  width: (w / tabs.length)})
        // }
    }, [])

    const throttleClick = useCallback((e) => {
        if (timeoutId.current === null){
            const {idx, value} = e.target.dataset;
            const {clientWidth: w} = e.target;
            setSpring({x: idx * w, width: w})
            rippleClick(() => handleClick(value), {delayTime: 300})(e);
            timeoutId.current = setTimeout(() => {
                timeoutId.current = null;
            }, throttle)
        }
    }, [handleClick, throttle, setSpring])

    return(
        <div ref={ref} className={b.e("bar")}>
            {tabs.map(({value, label, Icon, disabled=false}, i) => (
                <button onClick={throttleClick} disabled={disabled} data-idx={i} data-value={value} className={b.m({active: active == value})}>
                    {Icon && <Icon/>}
                    {label && <span className={b.e("label")}>{label}</span>}
                </button>
            ))}
            <a.div style={spring} className={b.e("indicator")} />
        </div>
    )
}

Tabs.defaultProps = {
    throttle: 200,
}

Tabs.propTypes = {
    /** Array of selectable tab objects */
    tabs:  arrayOf(shape({
        /** Identifies the tab as selected and is passed into the handleClick callback */
        value: oneOf(string, number),
        /** Optional label */
        label: string,
        /** Optional Icon */
        Icon: node,
        /** Determines whether the tab is actionable or not */
        disabled: bool
    })).isRequired,
    /** The value of the selected tab */
    active: oneOf(string, number),
    /** onClick throttling for the tabs */
    throttle: number,
    /** onClick event handler that invoked with the value of the clicked tab */
    handleClick: func.isRequired
}

export default Tabs;