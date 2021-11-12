import React, {useRef} from "react";
import PropTypes from "prop-types";
import bem from "bembo";
import {SearchIcon, CloseIcon} from "../Icons";
import {noop, triggerInputChange} from "../../utils"
// import "../../styles/styles.scss";
import "../../styles/partials/_search.scss";

const b = bem("search");

const SearchInput = ({onChange, handleKeyDown, value, placeholder}) => {
    const inputRef = useRef(null);

    const handleClear = () => {
        triggerInputChange(inputRef.current);
        inputRef.current.focus();
    };

    const visible = value !== "";
    return (
        <div className={b}>
            <div className={b.e("icon")}>
                <SearchIcon />
            </div>
            <input
                className={b.e("input")}
                ref={inputRef}
                handleKeyDown={handleKeyDown}
                type="search"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete="off"
            />
            <div
                onClick={handleClear}
                tabIndex="-1"
                role="button"
                className={b.e("clear", {visible})}
            >
                <CloseIcon />
            </div>
        </div>
    );
};

SearchInput.defaultProps = {
    placeholder: "",
    handleKeyDown: noop
}
SearchInput.propTypes = {
    /** Handler for change events */
    onChange: PropTypes.func.isRequired,
    /** Input elements value as a string */
    value: PropTypes.string.isRequired,
    /** Placeholder string when the textarea is empty */
    placeholder: PropTypes.string,
    /** Optional keydown event handle */
    handleKeyDown: PropTypes.func,
};

export default SearchInput;
