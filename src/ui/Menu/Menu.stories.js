import React, { useRef, useState } from 'react';
import Menu from '.';
import {Base as Button} from "../Button/Button.stories";

const options = ["Aaron", "Mike", "Matt", "Greg", "Ben", "Nick", "John", "Joe", "Dan", "Andy", "Robert", "Zsachary"];
function Template(args){
    const ref = useRef(null)
    const [value, setValue] = useState(args.selected);
    const [open, setOpen] = useState(false);
    return (
        <div ref={ref} style={{position: "relative", left: "0px", top: "0px"}}>
            <Button label="Open Menu" disabled={open} onClick={() => setOpen(true)} />
            <Menu anchorRef={ref} options={args.options} selected={value} open={open} handleClose={() => setOpen(false)}  handleSelect={(v) => (e) => setValue(v)}/>
        </div>
    )
}

const Base = Template.bind({});
Base.args = {
    selected: "Aaron",
    options,
}

export {Base}

const def = {
    component: Menu,
    title: "Menu",
    parameters: {
        docs: {
            description: {
                component: "### Menu"
            }
        },
        actions: {argTypesRegex: "^on.*"}
    },
    decorators: [(story) => <div className="flex flex--center">{story()}</div>]
}

export default def;