import React, {useRef, useState} from "react";
import Select from ".";
import { useSet } from "../../utils";
import Menu from "../Menu";

const options = ["Aaron", "Mike", "Matt", "Greg", "Ben", "Nick", "John", "Joe", "Dan", "Andy", "Robert", "Zsachary"];
function Template(args) {
    const [value, setValue] = useState(args.value);
    return (
        <div style={{width: "400px"}}>
            <Select value={value} options={args.options}>
                <Menu handleSelect={(v) => (e) => setValue(v)} />
            </Select>
        </div>
    );
}

function MultiTemplate(args) {
    const [value, setValue] = useSet(args.value);
    return (
        <div style={{width: "400px"}}>
            <Select value={value} options={args.options}>
                <Menu handleSelect={setValue} />
            </Select>
        </div>
    );
}

const Base = Template.bind({});
Base.args = {
    value: "Aaron",
    options,
};

const Multi = MultiTemplate.bind({})
Multi.args = {
    value: ["Aaron"],
    options
}

export {Base, Multi};

const def = {
    component: Select,
    title: "Select",
    parameters: {
        docs: {
            description: {
                component: "### Select",
            },
        },
        actions: {argTypesRegex: "^on.*"},
    },
    decorators: [(story) => <div className="flex flex--center" >{story()}</div>],
};

export default def;
