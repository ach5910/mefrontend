import React, { useContext, useRef } from 'react';
import {number, node, oneOf, string} from 'prop-types';

export const BOTTOM = "bottom";
export const TOP = "top";
export const LEFT = "left";
export const RIGHT = "right";

const padding = {
    HORIZ: 16,
    VERT: 8,
    LEFT: 8,
    RIGHT: 8,
    TOP: 4,
    BOTTOM: 4,
}

export const TooltipContext = React.createContext(null);
export const useTooltip = () => useContext(TooltipContext);

function getRect({left, top, width, height}, isTooltip=false){
    let rect = {}
    if (isTooltip){
        rect = {
            left: left - padding.LEFT,
            top: top - padding.TOP,
            bottom: top + height + padding.BOTTOM,
            right: left + width + padding.RIGHT,
            width: width + padding.HORIZ,
            height: height + padding.VERT,
        }
        
    } else {
        rect = {
            left,
            top,
            right: left + width,
            bottom: top + height,
            width,
            height
        }
    }
    rect.center = {
        x: rect.left + (rect.width / 2),
        y: rect.top + (rect.height / 2)
    }
    return rect;
}

function getStyle(contentBox, wrappedBox, padding, position){
    const rect = getRect(contentBox, true);
    const wrappedRect = getRect(wrappedBox);
    switch(position){
        case BOTTOM:
            return {
                top: wrappedRect.bottom + padding,
                left: wrappedRect.center.x - (rect.width / 2)
            }
        case RIGHT:
            return {
                top: wrappedRect.center.y - (rect.height / 2),
                left: wrappedRect.right + padding
            }
        case TOP:
            return {
                top: wrappedRect.top - rect.height - padding,
                left: wrappedRect.center.x - (rect.width / 2)
            }
        case LEFT:
            return {
                top: wrappedRect.center.y - (rect.height / 2),
                left: wrappedRect.left - rect.width - padding
            }
        default: 
            return {}
    }
}
const Tooltip = ({children, label, position, padding}) => {
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

Tooltip.defaultProps = {
    children: undefined,
    label: "",
    position: BOTTOM,
    padding: 8,
}

Tooltip.propTypes = {
    children: node,
    label: string,
    position: oneOf([
        BOTTOM,
        LEFT,
        TOP,
        RIGHT
    ]),
    padding: number
}

export default Tooltip;