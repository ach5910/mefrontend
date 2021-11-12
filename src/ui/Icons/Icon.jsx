import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import { styleShape } from '../../propTypes';

const Icon = ({className, style, viewBox, children}) => (
    <svg
        style={style}
        viewBox={viewBox}
        className={cn({[className]:className})}
    >
        {children}
    </svg>
)
Icon.defaultProps = {
    className: '',
    style: {},
    viewBox: "0 0 512 512",
    children: null
}

Icon.propTypes = {
    className: PropTypes.string,
    style: styleShape,
    viewBox: PropTypes.string,
    children: PropTypes.node
}

export default Icon;