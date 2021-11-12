import React, { useState } from "react";
import {DatePicker} from "./index";

function Template({value:v, ...args}) {
  const [value, setValue] = useState(v ?? "");//
    
  return <DatePicker {...args} value={value} handleChange={setValue}/>
}


// const Base = (args) => {
//     const [value, setValue] = useState("");//
    
//     return <DatePicker {...args} value={value} handleChange={setValue}/> ///checked={checked} onChange={() => setChecked(c => !c)} />;
// }


const Base = Template.bind({});
Base.args = {
    value: "",
    name: "datetime",
    label: "Date"
};
// Base.parameters = {
//     chromatic: { disable: true },
//     docs: { source: { type: 'dynamic' } },
// }


console.log("datepicker")
console.dir(DatePicker);
window.DP = DatePicker;

const def = {
    component: DatePicker,
    title: "DatePicker",
    parameters: {
      docs: {
        description: {
          component: `### DatePicker`
        }
      },
      actions: {argTypesRegex: "^on.*"}
    },
    decorators: [(story) => <div className="flex flex--col" style={{width: "100%", height: "450px"}}>{story()}</div>],
};

export default def;
export {Base}