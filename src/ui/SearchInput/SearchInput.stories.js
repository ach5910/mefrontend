import React, { useState } from "react";

import SearchInput from "./index";

function Template(args) {
    const [value, setValue] = useState("");
    return <SearchInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
}

const Base = Template.bind({});
Base.args = {
    placeholder: "Enter search text..",
};

export {Base}

const def = {
    component: SearchInput,
    title: "SearchInput",
    parameters: {
      docs: {
        description: {
          component: `### Search inputs are used to locate content within an application.`
        }
      },
      actions: {argTypesRegex: "^on.*"}
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