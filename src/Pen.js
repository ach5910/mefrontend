import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import {bool, func, shape, string, node, number} from "prop-types";
import "./pen.scss";

const url = "https://reqres.in/api/unknown?per_page=12";

/**
 * Check's all click events and invokes the handler when a click that originated
 * outside of the ref's container is found
 *
 * @param {{current: Node}} ref
 * @param {Function} handler
 *
 * @returns {Function} Wrapped function that will remove the click listener when invoked
 */
function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("click", listener);

        return () => {
            document.removeEventListener("click", listener);
        };
    }, [ref, handler]);
}

const ModalContent = ({children, handleClose}) => {
    const ref = useRef(null);
    useOnClickOutside(ref, handleClose);
    return (
        <div className="modal" ref={ref}>
            {children}
        </div>
    );
};

ModalContent.propTypes = {
    handleClose: func.isRequired,
    children: node.isRequired
}

const Modal = ({open, handleClose, children}) => {
    if (open) {
        return ReactDOM.createPortal(
            <div className="modal-backdrop">
                <ModalContent handleClose={handleClose} children={children} />
            </div>,
            document.body
        );
    }
    return <noscript />;
};

Modal.propTypes = {
    open: bool.isRequired,
    handleClose: func.isRequired,
    children: node.isRequired
}

const SelectedColor = ({selectedColor: {color, name, pantone_value, year}}) => (
    <>
        <h1 className="modal__header">{name}</h1>
        <div className="modal__body">
            <div className="modal__content">
                <div className="modal__color" style={{backgroundColor: color}} />
            </div>
            <div className="modal__content">
                <div>
                    <strong>Hex Value: </strong>
                    <span>{color}</span>
                </div>
                <div>
                    <strong>Pantone Value: </strong>
                    <span>{pantone_value}</span>
                </div>
                <div>
                    <strong>Year: </strong>
                    <span>{year}</span>
                </div>
            </div>
        </div>
    </>
);

SelectedColor.defaultProps = {
    selectedColor: {}
}
SelectedColor.propTypes = {
    selectedColor: shape({
        color: string,
        name: string,
        pantone_value: string,
        year: number
    })
}

const Card = ({id, color, name, handleSelect}) => (
    <li className="card__container">
        <div
            role="button"
            tabIndex="-1"
            className="card"
            style={{backgroundColor: color}}
            data-colorid={id}
            onClick={handleSelect}
        >
            {name}
        </div>
    </li>
);

Card.propTypes = {
    id: number.isRequired,
    color: string.isRequired,
    name: string.isRequired,
    handleSelect: func.isRequired
}

const Pen = () => {
    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState(undefined);

    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then(({data}) => {
                setColors(data);
            })
            .catch((error) => {
                console.log("Fetching Error", error)
            })
    }, []);

    const handleSelect = useCallback(
        (e) => {
            const {colorid} = e.target.dataset;
            const color = colors.find(({id}) => id == colorid);
            setSelectedColor(color);
        },
        [colors, setSelectedColor]
    );

    const handleClose = useCallback(() => {
        setSelectedColor(undefined);
    }, [setSelectedColor]);
    
    return (
        <>
            <ul className="cards-list">
                {colors.map(({id, name, color}) => (
                    <Card key={id} id={id} name={name} color={color} handleSelect={handleSelect} />
                ))}
            </ul>
            <Modal open={selectedColor !== undefined} handleClose={handleClose}>
                <SelectedColor selectedColor={selectedColor} />
            </Modal>
        </>
    );
};

Pen.defaultProps = {};

Pen.propTypes = {};

export default Pen;
