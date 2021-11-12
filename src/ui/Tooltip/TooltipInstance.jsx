import React from 'react';
import {bool, shape, number, oneOf, string} from 'prop-types';
import bem from "bembo";
import useMeasure from '../../utils/useMeasure';
import useDeepMemo from '../../utils/useDeepMemo';
import "../../styles/partials/_tooltip.scss";
import { BOTTOM, LEFT, RIGHT, TOP } from '.';

const b = bem("tooltip")

const padding = {
    HORIZ: 16,
    VERT: 8,
    LEFT: 8,
    RIGHT: 8,
    TOP: 4,
    BOTTOM: 4,
}

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
const TooltipInstance = ({position, rect, visible, label, padding}) => {
    const [bind, contentRect] = useMeasure(visible);

    const style = useDeepMemo(() => getStyle(contentRect, rect, padding, position), [contentRect, rect, padding, position]);
    return(
        <div {...bind} className={b.m({visible})} style={style}>
            {label}
        </div>
    )
}

TooltipInstance.defaultProps = {
    position: "bottom",
    visible: false,
    padding: 0,
}

TooltipInstance.propTypes = {
    /** Position of the where the tooltip is render with respect to the hovered element */
    position: oneOf([
        "left",
        "right",
        "top",
        "bottom"
    ]),
    /** Rect of the element the tool tip is a parent of */
    rect: shape({
        left: number,
        top: number,
        width: number,
        height: number
    }).isRequired,
    /** Visibility state */
    visible: bool,
    /** Optional additional padding between the tooltip and the wrapped element */
    padding: number,
    /** Tooltip text */
    label: string.isRequired
}

export default TooltipInstance;