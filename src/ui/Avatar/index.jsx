import React from 'react';
import {string, node} from 'prop-types';
import bem from "bembo";
import { styleShape } from '../../propTypes';

import "../../styles/partials/_avatar.scss";

const b = bem("avatar")

const Avatar = ({alt, src, children, className, style}) => {
    return(
        <div className={`${b} ${className}`} style={style}>
            {typeof src ==  "string" 
                ? <img className={b.e("img")} src={src} alt={alt}/>
                : children
            }
        </div>
    )
}

Avatar.defaultProps = {
    alt: "",
    src: undefined,
    className: "",
    style: {}
}

Avatar.propTypes = {
    alt: string,
    src: string,
    children: node,
    className: string,
    style: styleShape,
}

export default Avatar;