import React, {useState} from "react";

import Textarea from "./index";

function Template(args) {
    const [value, setValue] = useState(
        args.value ?? "LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quod eius aperiam eligendi odio quo ea, explicabo alias officiis itaque accusantium quaerat earum culpa, a non velit reiciendis, rem dolorem."
    );
    return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
}

const Base = Template.bind({});
Base.args = {
    label: "Textarea",
    id: "demo",
    name: "demo",
};

const EditOnFocus = Template.bind({});
EditOnFocus.args = {
    label: "Editable",
    id: "editable",
    name: "editable",
    editOnFocus: true,
};
EditOnFocus.parameters = {
    docs: {
        description: {
            story: `Edit on focus render a basics text container that updates to a textarea when the the component is clicked or focused.`,
        },
    },
};

const AutoSizing = Template.bind({});
AutoSizing.args = {
    id: "auto-sizing",
    name: "auto-sizing",
    value: "",
    placeholder: "Auto-sizing"
};
AutoSizing.parameters = {
    docs: {
        description: {
            story: `Text fields dynamically change their height to fix their contents.`,
        },
    },
};

const ReadOnly = Template.bind({});
ReadOnly.args = {
    id: "read-only",
    name: "read-only",
    readOnly:true,
};
ReadOnly.parameters = {
    docs: {
        description: {
            story: `Read only textareas can be used to restrict accepting user input and behaves like a common text container.`,
        },
    },
};
export {Base, EditOnFocus, AutoSizing, ReadOnly};

const def = {
    component: Textarea,
    title: "Textarea",
    parameters: {
        docs: {
            description: {
                component: `### Text fields let users enter and edit text.  \n\nText fields allow users to enter text into a UI. They typically appear in forms and dialogs.`,
            },
        },
        actions: {argTypesRegex: "^on.*"},
    },
    decorators: [
        (story) => (
            <div className="flex flex--center">
                <div style={{width: "300px"}}>{story()}</div>
            </div>
        ),
    ],
};

export default def;
