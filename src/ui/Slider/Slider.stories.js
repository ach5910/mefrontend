import React, { useCallback, useState } from "react";

import Slider from "./index";

function Template(args) {
    const [value, setValue] = useState(0);//

    const handleChange = useCallback(
        (e, val) => {
            setValue(val)
        }
    )
    return <Slider {...args} value={value} handleChange={handleChange}/> ///checked={checked} onChange={() => setChecked(c => !c)} />;
}

const Base = Template.bind({});
Base.args = {
    min: 0,
    max: 100
};

console.log('slider');
console.dir(Slider);
export {Base}

const def = {
    component: Slider,
    title: "Slider",
    parameters: {
      docs: {
        description: {
          component: `### Slider`
        }
      },
      actions: {argTypesRegex: "^on.*"}
    },
    decorators: [(story) => <div className="flex flex--center" style={{width: "100%", height: "100px"}}>{story()}</div>],
};

export default def;