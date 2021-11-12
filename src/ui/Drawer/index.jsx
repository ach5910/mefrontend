import React, {useRef} from "react";
import {bool, string, func, node} from "prop-types";
import useMediaQuery from "../../utils/useMediaQuery";
import bem from "bembo";

import DrawerHeader from "./DrawerHeader";
import DrawerSection from "./DrawerSection";

import "../../styles/partials/_drawer.scss";
import { styleShape } from "../../propTypes";

const b = bem("drawer");


const Drawer = ({open, handleClose, children, style,  wrapperStyle, className:cl}) => {
    const ref = useRef(null);
    const isLargeScreen = useMediaQuery("only screen and (min-width : 993px)");
    const modal = !isLargeScreen;
    const backdrop = open && modal;
    return (
        <>
            <div className={b.e("scrim", {backdrop})} onClick={handleClose} />
            <div ref={ref} style={wrapperStyle} className={b.e("wrapper", {modal})}>
                <aside style={style} className={`${b.m({modal, open})} ${cl}`}>{children}</aside>
            </div>
        </>
    );
};

export {DrawerHeader, DrawerSection};

Drawer.defaultProps = {
    open: false,
    children: null,
    style: {},
    wrapperStyle: {},
    className: ""
};

Drawer.propTypes = {
    open: bool,
    handleClose: func.isRequired,
    children: node,
    wrapperStyle: styleShape,
    style: styleShape,
    className: string,
};

export default Drawer;
