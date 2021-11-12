import React, { useState } from "react";

import Toggle from "./index";

function Template(args) {
    //const [checked, setChecked] = useState(true);//
    return <Toggle {...args} /> ///checked={checked} onChange={() => setChecked(c => !c)} />;
}

const Base = Template.bind({});
Base.args = {
    label: "Toggle",
    id: "demo",
    name: "demo",
    value: "demo",
};

export {Base}

const def = {
    component: Toggle,
    title: "Toggle",
    parameters: {
      docs: {
        description: {
          component: `### Switches toggle the state of a single setting on or off.  \n\nSwitches are the preferred way to adjust settings on mobile. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label.`
        }
      },
      actions: {argTypesRegex: "^on.*"}
    },
    decorators: [(story) => <div className="flex flex--center">{story()}</div>],
};

export default def;