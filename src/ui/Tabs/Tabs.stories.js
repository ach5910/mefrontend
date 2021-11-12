import React, { useState } from 'react';

import Tabs from ".";

function Template(args){
    const [tab, setTab] = useState("Aaron")
    return <Tabs {...args} active={tab} handleClick={setTab}/>
}

const Base = Template.bind({})
Base.args = {
    tabs:[{value: "Aaron", label: "Aaron"}, {value: "Mike", label: "Mike", disabled: true}, {value: "Matt", label: "Matt"}, {value: "Greg", label: "Greg"}],
}

export {Base};

const def = {
    component: Tabs,
    title: "Tabs",
    parameters: {
        docs: {
            description: {
                component: `### Tabs`,
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
}

export default def;