import React, { useState } from "react";

import Checkbox from "./index";

function Template(args) {
    const [checked, setChecked] = useState(true);
    if (args?.checkboxes) {
        return args.checkboxes.map((props) => <Checkbox {...props} />);
    }
    return <Checkbox {...args} checked={checked} onChange={() => setChecked(c => !c)} />;
}

const Base = Template.bind({});
Base.args = {
    label: "Checkbox",
    id: "demo"
};

export {Base}

const def = {
    component: Checkbox,
    title: "Checkbox",
    parameters: {
      docs: {
        description: {
          component: `### Checkboxes allow the user to select one or more items from a set. Checkboxes can be used to turn an option on or off.`
        }
      },
      actions: {argTypesRegex: "^on.*"}
    },
    decorators: [(story) => <div className="flex flex--center">{story()}</div>],
};

export default def;