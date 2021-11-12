import React, {useRef, useState} from "react";
import MobileSandbox from ".";
import {Base as Button} from "../Button/Button.stories";
import Dialog from "../Modal/Dialog";

function Template(args) {
    const [open, setOpen] = useState(args.open);
    return (
        <MobileSandbox>
            {/* {(sandboxRef) => ( */}
                <div className="flex flex--center">
                    <Button label="Open MobileSandbox" disabled={open} onClick={() => setOpen(true)} />
                    <Dialog open={open} handleClose={() => setOpen(false)} />
                </div>
            {/* } */}
        </MobileSandbox>
    );
}

const Base = Template.bind({});

export {Base};

const def = {
    component: MobileSandbox,
    title: "MobileSandbox",
    parameters: {
        docs: {
            description: {
                component: "### MobileSandbox",
            },
        },
        actions: {argTypesRegex: "^on.*"},
    },
    decorators: [
        (story) => (
            <div className="flex flex--center" style={{height: "700px"}}>
                {story()}
            </div>
        ),
    ],
};

export default def;
