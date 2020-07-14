import React, {useRef} from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import SearchIcon from "../icons/SearchIcon";
import CloseIcon from "../icons/CloseIcon";
import { triggerInputChange, noop } from "../../utils";
import "./_search.scss";

const SearchInput = ({handleChange, handleKeyDown, value, placeholder}) => {
    const inputRef = useRef(null);

    const handleClear = () => {
        triggerInputChange(inputRef.current);
        inputRef.current.focus();
    };

    return (
        <div className="search">
            <div className="search__icon">
                <SearchIcon />
            </div>
            <input
                className="search__input"
                ref={inputRef}
                handleKeyDown={handleKeyDown}
                type="search"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                autoComplete="off"
            />
            <div
                onClick={handleClear}
                tabIndex="-1"
                role="button"
                className={cn("search__clear", {"search__clear--visible": value != ""})}
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
    handleSearch: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    handleKeyDown: PropTypes.func,
};

export default SearchInput;
