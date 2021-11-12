import React from 'react';
import PropTypes from 'prop-types';
import bem from "bembo";
import "../../styles/partials/_menu.scss";
import { noop } from '../../utils';

const b = bem("menu").e("item")

const MenuItem = ({label, selected, handleSelect = noop}) => {

    return(
        <div onClick={handleSelect} className={b.m({selected})}>
            {label}
        </div>
    )
}

MenuItem.defaultProps = {

}

MenuItem.propTypes = {

}

export default MenuItem;