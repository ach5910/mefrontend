import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import CloseIcon from "../icons/CloseIcon";
import AddIcon from "../icons/AddIcon";
import {alphaNumeric, styleShape} from "../../propTypes";
import { noop } from "../../utils";
import "./_chip.scss";

const Chip = ({text, handleClick, add, style={}, disabled=false}) => (
    <span style={style} onClick={() => {}} role="button" tabIndex="1" className={cn("chip", {"chip--inactive": add, "chip--disabled": disabled})}>
        {text}
        {/* {!disabled && add &&
            <div className="chip__add" role="button" tabIndex="-1" onClick={handleClick}>
                <AddIcon />
            </div>
          
        }
        {!disabled && !add &&
            <div className="chip__delete" role="button" tabIndex="-1" onClick={handleClick}>
                <CloseIcon />
            </div>
        } */}
    </span>
);

Chip.defaultProps = {
    handleClick: noop,
    add: false,
    disabled: false,
    style: {}
};

Chip.propTypes = {
    text: alphaNumeric.isRequired,
    handleClick: PropTypes.func,
    add: PropTypes.bool,
    disabled: PropTypes.bool,
    style: styleShape
};

export default Chip;
