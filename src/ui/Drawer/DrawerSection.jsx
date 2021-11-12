import React from 'react';
import {string, node} from 'prop-types';
import bem from "bembo";

const b = bem("drawer")

const DrawerSection = ({label, children}) => (
    <div className={b.e("section")}>
        <p className={b.e("section-label")}>{label}</p>
        {children}
    </div>
);

DrawerSection.defaultProps = {
    label: "",
    children: null
}

DrawerSection.propTypes = {
    label: string,
    children: node
}

export default DrawerSection;