import React from 'react';
import {node} from 'prop-types';


const DrawerHeader = ({children}) => <div className="drawer__header">{children}</div>;

DrawerHeader.defaultProps = {
    children: null
}

DrawerHeader.propTypes = {
    children: node
}

export default DrawerHeader;