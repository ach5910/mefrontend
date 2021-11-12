import React, { useRef, useState } from 'react';
import Modal from '.';
import {Base as Button} from "../Button/Button.stories";
import Dialog from './Dialog';

function Template(args){
    const [open, setOpen] = useState(args.open);
    return (
        <>
            <Button label="Open Modal" disabled={open} onClick={() => setOpen(true)} />
            <Dialog open={open} handleClose={() => setOpen(false)} />
        </>
    )
}

const Base = Template.bind({});
Base.args = {
    open:false
}

export {Base}

const def = {
    component: Modal,
    title: "Modal",
    parameters: {
        docs: {
            description: {
                component: "### Modal"
            }
        },
        actions: {argTypesRegex: "^on.*"}
    },
    decorators: [(story) => <div className="flex flex--center">{story()}</div>]
}

export default def;