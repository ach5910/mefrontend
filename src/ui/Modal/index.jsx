import React, {useRef} from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import cn from "classnames";
import useOnClickOutside from "../../utils/useOnClickOutside";
import {ref} from "../../propTypes";
// import "../../styles/styles.scss";
import "../../styles/partials/_modal.scss";

const ModalDisplay = ({className, children, handleClose}) => {
    const modalRef = useRef(null);
    useOnClickOutside(modalRef, handleClose);

    return <div className={cn("modal", {[className]: className})}>{children}</div>;
};

const Modal = ({open, className, children, handleClose, anchorRef}) => {
    if (open) {
        return createPortal(
            <div className="modal-backdrop">
                <ModalDisplay className={className} handleClose={handleClose} children={children} />
            </div>,
            anchorRef
        );
    }
    return <noscript />;
};

Modal.defaultProps = {
    className: "",
    anchorRef: document.body,
    open: false,
};

Modal.propTypes = {
    /** Determines if the modal is rendered or not */
    open: PropTypes.bool,
    /** The parent element the modal should use for positioning */
    anchorRef: ref,
    /** Called when the user click outside the Modal */
    handleClose: PropTypes.func.isRequired,
    /** Modal content */
    children: PropTypes.node.isRequired,
    /** Optional className appended to the modal */
    className: PropTypes.string,
};

export default Modal;
