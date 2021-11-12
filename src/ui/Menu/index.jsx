import React from "react";
import ReactDOM from "react-dom";
import {arrayOf, oneOfType, bool, shape, func} from "prop-types";

import {alphaNumeric, ref} from "../../propTypes";

import MenuList from "./MenuList";

export const Menu = ({open, options, children, anchorRef, portalRef, handleSelect, selected, handleClose}) => {
    if (open) {
        return ReactDOM.createPortal(
            <MenuList
                options={options}
                anchorRef={anchorRef}
                handleClose={handleClose}
                handleSelect={handleSelect}
                selected={selected}
            >
                {children}
            </MenuList>,
            portalRef.current
        );
    }
    return <noscript/>;
};

Menu.defaultProps = {
    anchorRef: undefined,
    selected: "",
    portalRef: {current: document.body}
};

Menu.propTypes = {
    /** Determine when the Menu is rendered or not */
    open: bool.isRequired,
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
    /** 
     * Reference to an element that the menu will append to.
     * This is used to control stacking context of multiple positioned elements.
     * Defaults to document.body
     */
    portalRef: ref,
    /** Value of the selected option(s) */
    selected: oneOfType([alphaNumeric, arrayOf(alphaNumeric)]),
    /** Invoked when click events occur outside the menu */
    handleClose: func.isRequired,
    /** onClick handlers for list items */
    handleSelect: func.isRequired,
};

export default Menu;
