import React from 'react';
import Checkbox from '.';
import {render, screen, waitFor, userEvent} from "../../test-utils";

it('should only include one checkbox', () => {
    const handleChange = jest.fn();
    render(<Checkbox checked={false} id="test" handleChange={handleChange} />);

    expect(screen.queryAllByRole("checkbox").length).toEqual(1);
})