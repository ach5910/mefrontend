import React from "react";
import {render, screen, waitFor, userEvent} from "../../test-utils";
import Textarea from ".";

let value;
const handleChange = jest.fn(e => {
    e.persist();
    value = e.target.value;
});

afterEach(() => {
    value=null;
    jest.clearAllMocks();
});

const getTextArea = (screen) => screen.getByRole("textbox");

it('renders an input with a label', () => {
    render(
        <Textarea
            handleChange={handleChange}
            label="Test Label"
            value=""
        />
    )
    expect(getTextArea(screen)).toBeInTheDocument();
})

it('defaults to one row', () => {
    render(
        <Textarea
            handleChange={handleChange}
            label="Test Label"
            value="test value"
        />
    )
    expect(getTextArea(screen).rows).toEqual(1);
})

it('displays error messages', () => {
    render(
        <Textarea
            handleChange={handleChange}
            label="Test Label"
            value=""
            error="Test Error"
        />
    )

    expect(screen.getByRole("textbox")).toHaveDescription("Test Error");
})


it('sets an input as required', () => {
    render(
        <Textarea
            handleChange={handleChange}
            label="Test Label"
            value=""
            required
        />
    )
    expect(screen.getByRole("textbox")).toBeRequired()
})

it('blocks input when readOnly prop is true', () => {
    render(
        <Textarea
            handleChange={handleChange}
            label="Test Label"
            value=""
            readOnly
        />
    )

    userEvent.type(screen.getByRole("textbox"), "test value");
    expect(handleChange).not.toHaveBeenCalled()
})

it('allows input when readOnly prop is false', () => {
    render(
        <Textarea
            handleChange={handleChange}
            label="Test Label"
            value=""
            readOnly={false}
        />
    )
    
    userEvent.type(screen.getByRole("textbox"), "test value");
    expect(handleChange).toHaveBeenCalled();
})

it('calls handleChange with the change event', () => {
    render(
        <Textarea
            handleChange={handleChange}
            label="Test Label"
            value=""
        />
    )
    
    userEvent.type(screen.getByRole("textbox"), "test value");
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(10)
    expect(value).toBe("e")
})