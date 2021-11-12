import React from "react";
/* eslint react/prop-types: 0 */
import "react-dom";
import "@bit/ach5910.mefrontend.dom-testing-library";
import '@testing-library/jest-dom/extend-expect'; 
import userEvent from "@bit/ach5910.mefrontend.user-event";
import {render as rtlRender} from "@bit/ach5910.mefrontend.react-testing-library";

/**
 * Extends `@testing-library/react` to add a
 * react-redux `<Provider/>` wrapper
 * @param {React.ReactNode} ui The node to be rendered
 * @param {object} options Render options
 */
function render(ui) {
    function Wrapper({children}) {
        return children;
    }
    return rtlRender(ui, {wrapper: Wrapper});
}

// re-export everything
export * from "@bit/ach5910.mefrontend.react-testing-library";

// override render method
export {render, userEvent};
