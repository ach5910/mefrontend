import React, {useEffect, useRef} from "react";
import {arrayOf, shape, oneOfType, func} from "prop-types";
import bem from "bembo";

import {alphaNumeric, ref} from "../../propTypes";
import noop from "../../utils/noop";
import useOnClickOutside from "../../utils/useOnClickOutside";

import MenuItem from "./MenuItem";

import "../../styles/partials/_menu.scss";

const b = bem("menu");

function getStyle(anchorRef) {
    const {bottom, left, width} = anchorRef.current?.getBoundingClientRect() ?? {left: 0, bottom: 0, width: 0};
    const distFromBottom = window.innerHeight - bottom;
    const style = {
        top: `${bottom}px`,
        left: `${left}px`,
        width: `${width}px`,
        transformOrigin: "center 0px",
        maxHeight: `${distFromBottom - 16}px`,
    };

    // Render list bottom up if too close to the screen height
    if (bottom + 200 >= window.innerHeight) {
        style.bottom = `${window.innerHeight - bottom}px`;
        style.transformOrigin = "center 100%";
        style.maxHeight = `${bottom - 16}px`;
        delete style.top;
    }
    return style;
}

function renderChildren(options, children, selected, handleSelect) {
    // renderFunction support
    if (typeof children == "function") {
        return options.map((option) => children(option));
    }
    // basic composition
    if (React.isValidElement(children)) {
        return children;
    }

    // fallback to custom item rendering
    const _selected = Array.isArray(selected) ? selected : [selected];
    return options.map((option) => (
        <MenuItem label={option} selected={_selected.includes(option)} handleSelect={handleSelect(option)} />
    ));
}
const MenuList = ({options, children, anchorRef, handleSelect, selected, handleClose}) => {
    const menuRef = useRef(null);
    useOnClickOutside(menuRef, handleClose);

    // lock body scroll while the menu is open
    useEffect(() => {
        const orig = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = orig;
        };
    }, []);

    const style = getStyle(anchorRef);
    return (
        <div ref={menuRef} style={style} className={b}>
            {renderChildren(options, children, selected, handleSelect)}
        </div>
    );
};

MenuList.defaultProps = {
    anchorRef: {current: document.body},
    selected: "",
    handleSelect: noop,
};

MenuList.propTypes = {
    /** Menu option labels */
    options: arrayOf(
        oneOfType([
            alphaNumeric,
            shape({
                value: alphaNumeric,
            }),
        ])
    ).isRequired,
    /** Reference to an element that the menu will anchor to */
    anchorRef: ref,
    /** Value of the selected option(s) */
    selected: oneOfType([alphaNumeric, arrayOf(alphaNumeric)]),
    /** Invoked when click events occur outside the menu */
    handleClose: func.isRequired,
    /** onClick handlers for list items */
    handleSelect: func,
};

export default MenuList;
