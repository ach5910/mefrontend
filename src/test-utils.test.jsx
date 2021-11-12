import React from "react";
import {render, screen, userEvent} from "./test-utils";

it('renders a div', () => {
    render(<div>Hey</div>);
    expect(screen.getByText("Hey")).toBeInTheDocument();
})