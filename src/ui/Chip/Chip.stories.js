import React from "react";
import { AddIcon } from "../Icons";

import Chip from "./index";

function Template(args) {
    if (args?.chips) {
        return args.chips.map((props) => <Chip {...props} />);
    }
    return <Chip {...args} />;
}

const InitialIcon = () => (
    <div className="flex flex--center" style={{backgroundColor: "orange", color: "white", fontSize: "14px", fontWeight: "700", height: "100%", width: "100%"}}>
        AH
    </div>
)

const Base = Template.bind({});
Base.args = {
    remove: true,
            Avatar: InitialIcon,
            label: "Chip"
};

const InputChips = Template.bind({});
InputChips.args = {
    chips: [
        {
            remove: true,
            label: "Default"
        },
        {
            remove: true,
            label: "Selected",
            selected: "true",
        },
        {
            remove: true,
            label: "Disabled",
            disabled: true
        },
    ]
}
InputChips.parameters = {
    docs: {
        description: {
            story:
                "**Input** chips represent information used in fields, such as an entity or different attributes.",
        },
    },
};

const InputChipsWithAvatar = Template.bind({});
InputChipsWithAvatar.args = {
    chips: [
        {
            remove: true,
            Avatar: InitialIcon,
            label: "Default"
        },
        {
            remove: true,
            Avatar: InitialIcon,
            label: "Selected",
            selected: "true",
        },
        {
            remove: true,
            Avatar: InitialIcon,
            label: "Disabled",
            disabled: true
        },
    ]
}

const FilterChips = Template.bind({});
FilterChips.args = {
    chips: [
        {
            label: "Default"
        },
        {
            label: "Selected",
            selected: "true",
        },
        {
            label: "Disabled",
            disabled: true
        },
    ]
}

FilterChips.parameters = {
    docs: {
        description: {
            story:
            "**Filter** chips represent filters for a collection.",
        },
    },
};

const FilterChipsWithAvatar = Template.bind({});
FilterChipsWithAvatar.args = {
    chips: [
        {
            Avatar: InitialIcon,
            label: "Default"
        },
        {
            Avatar: InitialIcon,
            label: "Selected",
            selected: "true",
        },
        {
            Avatar: InitialIcon,
            label: "Disabled",
            disabled: true
        },
    ]
}

const ChoiceChips = Template.bind({});
ChoiceChips.args = {
    chips: [
        {
            label: "Default"
        },
        {
            label: "Activated",
            activated: "true",
        },
        {
            label: "Disabled",
            disabled: true
        },
    ]
}

ChoiceChips.parameters = {
    docs: {
        description: {
            story:
            "In sets that contain at least two options, **choice** chips represent a single selection.",
        },
    },
};

export {Base, InputChips, InputChipsWithAvatar, FilterChips, FilterChipsWithAvatar, ChoiceChips}

const def = {
    component: Chip,
    title: "Chip",
    parameters: {
      docs: {
        description: {
          component: `### Chips are compact elements that represent an input, attribute, or action.  \n\n Chips allow users to enter information, make selections, filter content, or trigger actions.`
        }
      },
      actions: {argTypesRegex: "^on.*"}
    },
    decorators: [(story) => <div className="flex flex--center">{story()}</div>],
};

export default def;