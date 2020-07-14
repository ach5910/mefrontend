import React from "react";
/* eslint react/prop-types: 0 */
import {render as rtlRender} from "@testing-library/react";

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
export * from "@testing-library/react";

// override render method
export {render};
