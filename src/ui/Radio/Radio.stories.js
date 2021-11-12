import React, { useState } from "react";

import Radio from "./index";

function Template(args) {
    const [checked, setChecked] = useState("Right");
    if (args?.radioButtons) {
        return args.radioButtons.map((props) => <Radio {...props} checked={checked == props.value} onChange={(e) => setChecked(e.target.value)}/>);
    }
    return <Radio {...args} checked onChange={() => {}} />;
}

const Base = Template.bind({});
Base.args = {
    label: "Radio",
    id: "demo",
    value: "demo",
    name: "demo"
};

const RadioGroup = Template.bind({});
RadioGroup.args = {
    radioButtons: [
        {
            label: "Right",
            id: "Right",
            name: "Right",
            value: "Right",
            labelPosition: "right",
        },
        {
            label: "Left",
            id: "Left",
            name: "Left",
            value: "Left",
            labelPosition: "left",
        },
        {
            label: "Top",
            id: "Top",
            name: "Top",
            value: "Top",
            labelPosition: "top",
        },
        {
            label: "Bottom",
            id: "Bottom",
            name: "Bottom",
            value: "Bottom",
            labelPosition: "bottom",
        },
        {
            label: "disabled",
            id: "disabled",
            name: "disabled",
            value: "disabled",
            disabled: true,
            labelPosition: "right",
        },
    ]
}

export {Base, RadioGroup}

const def = {
    component: Radio,
    title: "Radio",
    parameters: {
      docs: {
        description: {
          component: `### Radio buttons allow the user to select one option from a set.  \n\nUse radio buttons when the user needs to see all available options. If available options can be collapsed, consider using a dropdown menu because it uses less space.`
        }
      },
      actions: {argTypesRegex: "^on.*"}
    },
    decorators: [(story) => <div className="flex flex--center">{story()}</div>],
};

export default def;