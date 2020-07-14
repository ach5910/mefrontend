import React from "react";
import userEvent from "@testing-library/user-event";
import {render, screen, waitFor} from "../../test-utils";
import Input from "./Input";

let value;
const handleChange = jest.fn(e => {
    e.persist();
    value = e.target.value;
});

afterEach(() => {
    value=null;
    jest.clearAllMocks();
});
it('renders an input with a label', () => {
    render(
        <Input
            type="text"
            handleChange={handleChange}
            label="Test Label"
            value=""
        />
    )

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
})

it('displays error messages', () => {
    render(
        <Input
            type="text"
            handleChange={handleChange}
            label="Test Label"
            value=""
            error="Test Error"
        />
    )

    expect(screen.getByLabelText("Test Label")).toHaveDescription("Test Error");
})


it('sets an input as required', () => {
    render(
        <Input
            type="text"
            handleChange={handleChange}
            label="Test Label"
            value=""
            required
        />
    )
    expect(screen.getByLabelText("Test Label")).toBeRequired()
})

it('blocks input when readOnly prop is true', () => {
    render(
        <Input
            type="text"
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
        <Input
            type="text"
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
        <Input
            type="text"
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

it('blocks text input on a number input', async () => {
    let valid;
    const handleNumber = jest.fn((e) => {
        value = e.target.value;
        valid = e.target.validity.valid;
    })
    render(
        <Input
            type="number"
            handleChange={handleNumber}
            label="Test Label"
            value="0"
            min="0"
            max="10"
            step="1"
        />
    )

    userEvent.type(screen.getByLabelText("Test Label"), "invalid")
    await waitFor(() => {
        expect(handleNumber).toHaveBeenCalled();

    })
    expect(Number.isNaN(+value)).toBe(false)
    expect(valid).toBe(true)
})

it('sets the number input to invalid when value is outside of range', () => {
    const {rerender} = render(
        <Input
            type="number"
            handleChange={handleChange}
            label="Test Label"
            value="0"
            min="0"
            max="10"
            step="1"
        />
    )
    const input = screen.getByLabelText("Test Label");

    expect(input).toBeValid();

    rerender(
        <Input
            type="number"
            handleChange={handleChange}
            label="Test Label"
            value="11"
            min="0"
            max="10"
            step="1"
        />
    )

    expect(input).toBeInvalid();

    rerender(
        <Input
            type="number"
            handleChange={handleChange}
            label="Test Label"
            value="-1"
            min="0"
            max="10"
            step="1"
        />
    )

    expect(input).toBeInvalid();
})