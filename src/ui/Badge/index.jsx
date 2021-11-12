import React from 'react';
import {node, bool} from 'prop-types';
import bem from "bembo";

import "../../styles/partials/_badge.scss"
import { alphaNumeric } from '../../propTypes';

const b = bem("badge")

const Badge = ({badgeContent, children, alignBottom,  alignLeft, circle, showFalsy}) => {
    const alignVertical  =  alignBottom ? "bottom" : "top";
    const alignHorizontal = alignLeft ? "left" : "right";
    console.log('badgeContent', badgeContent)
    const isContentTypeSafe = typeof badgeContent == "string" || typeof badgeContent == "number";
    const shouldRenderBadge = isContentTypeSafe && (!!badgeContent || showFalsy)
    return(
        <div className={b}>
            {children}
            {shouldRenderBadge && (<span className={b.e("content", {circle}).m(alignVertical, alignHorizontal)}>{badgeContent}</span>)}
        </div>
    )
}

Badge.defaultProps = {
    badgeContent: "",
    alignBottom: false,
    alignLeft: false,
    circle: false,
    showFalsy: false
}

Badge.propTypes = {
    /** Renders inside the badge emblem */
    badgeContent: alphaNumeric,
    /** Contents to wrap the Badge container around */
    children: node.isRequired,
    /** Determines vertical alignment */
    alignBottom: bool,
    /** Determines horizontal alignment */
    alignLeft: bool,
    /** Modifies the badge location when children render within a circle */
    circle: bool,
    /** 
     * Display a the badge when badgeContent is falsy 
     * @example badgeContent = "" || 0
     */
    showFalsy: bool
}

export default Badge;