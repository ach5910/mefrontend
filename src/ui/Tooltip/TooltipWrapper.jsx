import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTooltip, BOTTOM, LEFT, TOP, RIGHT } from '.';


const TooltipWrapper = ({children, label, position, padding}) => {
    const ref = useRef(null);
    const {onMouseEnter, onMouseLeave} = useTooltip();

    const handleMouseEnter = (e) => {
        const rect = ref.current.getBoundingClientRect();
        onMouseEnter({label, position, padding, rect})
    }
    
    return(
        <div ref={ref} style={{display: "inline-block"}} onMouseEnter={handleMouseEnter} onMouseLeave={onMouseLeave}>
            {children}
        </div>
    )
}

TooltipWrapper.defaultProps = {
    children: undefined,
    label: "",
    position: BOTTOM,
    padding: 8,
}

TooltipWrapper.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    position: PropTypes.oneOf([
        BOTTOM,
        LEFT,
        TOP,
        RIGHT
    ]),
    padding: PropTypes.number
}

export default TooltipWrapper;