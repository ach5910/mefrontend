import React from "react";

import Button from "./index";

function Template(args) {
    if (args?.buttons) {
        return args.buttons.map((props) => <Button {...props} />);
    }
    return <Button {...args} />;
}

const onClick = () => {};
const Base = Template.bind({});
Base.args = {
    label: "Submit",
};

const Contained = Template.bind({});
Contained.args = {
    buttons: [
        {
            label: "Primary",
        },
        {
            onClick,
            label: "Secondary",
            secondary: true,
        },
        {
            onClick,
            label: "Round",
            round: true,
        },
        {
            onClick,
            label: "Disabled",
            disabled: true,
        },
    ],
};

Contained.parameters = {
    docs: {
        description: {
            story: `__Contained__ buttons are high-emphasis, distinguished by their use of elevation and fill. They contain actions that are primary to your app.`,
        },
    },
};

const Text = Template.bind({});
Text.args = {
    buttons: [
        {
            onClick,
            variant: "text",
            label: "Primary",
        },
        {
            onClick,
            variant: "text",
            label: "Secondary",
            secondary: true,
        },
        {
            onClick,
            variant: "text",
            round: true,
            label: "Round",
        },
        {
            onClick,
            variant: "text",
            label: "Disabled",
            disabled: true,
        },
    ],
};

Text.parameters = {
    docs: {
        description: {
            story:
                "**Text** buttons are typically used for less-pronounced actions, including those located:  \n  \n- In Dialogs  \n- In Cards  \n\nIn cards, text buttons help maintain an emphasis on card content.",
        },
    },
};

const Outlined = Template.bind({});
Outlined.args = {
    buttons: [
        {
            onClick,
            variant: "outline",
            label: "Primary",
        },
        {
            onClick,
            variant: "outline",
            label: "Secondary",
            secondary: true,
        },
        {
            onClick,
            variant: "outline",
            round: true,
            label: "Round",
        },
        {
            onClick,
            variant: "outline",
            label: "Disabled",
            disabled: true,
        },
    ],
};

Outlined.parameters = {
    docs: {
        description: {
            story: `__Outlined__ buttons are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app.  \n\n Outlined buttons are also a lower emphasis alternative to contained buttons, or a higher emphasis alternative to text buttons.`,
        },
    },
};
// const Text = Template.bind({});
// Text.args = {
//     onClick,
//     label: "Text",
//     variant: "text",
// };

// const Round = Template.bind({});
// Round.args = {
//     onClick,
//     label: "Round",
//     round: true,
// };

// const Outline = Template.bind({});
// Outline.args = {
//     onClick,
//     label: "Outline",
//     variant: "outline",
// };

// export {Base, Secondary, Text, Outline, Round};

export {Base, Contained, Text, Outlined};
const def = {
    component: Button,
    title: "Button",
    parameters: {
      docs: {
        description: {
          component: `### Buttons allow users to take actions, and make choices, with a single tap. \n\n Buttons communicate actions that users can take. They are typically placed throughout your UI, in places like:  \n  \n- Dialogs  \n- Modals  \n- Forms \n- Cards \n- Toolbars`
        }
      },
      actions: {argTypesRegex: "^on.*"}
    },
    decorators: [(story) => <div className="flex flex--center">{story()}</div>],
};

export default def;
