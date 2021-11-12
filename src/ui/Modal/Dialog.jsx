import React from 'react';
import PropTypes from 'prop-types';
import Modal from '.';
import Button from '../Button';


const Dialog = ({open, handleClose, anchorRef}) => {

    return(
        <Modal anchorRef={anchorRef} open={open} handleClose={handleClose}>
            <h6 className="modal__header">Dialog Header</h6>
            <p className="modal__content">LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quod eius aperiam eligendi odio quo ea, explicabo alias officiis itaque accusantium quaerat earum culpa, a non velit reiciendis, rem dolorem.</p>
            <div className="btn-container">
                <Button label="Cancel" onClick={handleClose} className="btn--outline" />
                <Button label="Submit" onClick={handleClose} />
            </div>
        </Modal>
    )
}

Dialog.defaultProps = {

}

Dialog.propTypes = {

}

export default Dialog;