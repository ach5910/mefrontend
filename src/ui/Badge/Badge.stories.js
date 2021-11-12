import React from "react";
import Avatar from "../Avatar";
import CalendarIcon from "../Icons/CalendarIcon";

import Badge from "./index";

function Template({children, ...args}) {
    return <Badge {...args}>{children}</Badge>; ///checked={checked} onChange={() => setChecked(c => !c)} />;
}

const Base = Template.bind({});
Base.args = {
    badgeContent: 9,
    children: <CalendarIcon className="icon-base" />,
};

const AvatarBadge = Template.bind({});
AvatarBadge.args = {
    badgeContent: 9,
    circle: true,
    children: (
        <Avatar style={{backgroundColor: "#3f51b5"}}>
            <CalendarIcon className="icon-base" />
        </Avatar>
    ),
};

AvatarBadge.parameters = {
    docs: {
        description: {
            story:
            "**Avatars** can easily be wrapped with a `Badge` component to render standard component that's utilized across many popular platform. It's important to note than when using an avatar the `circle` prop should be set on the `Badge`.",
        },
    },
};

// const AvatarBadge = (args) => <Badge {...args}></Badge>;
const Position = () => (
    <>
        <Badge badgeContent="10">
            <CalendarIcon className="icon-base" />
        </Badge>
        <Badge badgeContent="10" alignBottom>
            <CalendarIcon className="icon-base" />
        </Badge>
        <Badge badgeContent="10" alignBottom alignLeft>
            <CalendarIcon className="icon-base" />
        </Badge>
        <Badge badgeContent="10" alignLeft>
            <CalendarIcon className="icon-base" />
        </Badge>
    </>
);

Position.parameters = {
    docs: {
        description: {
            story:
            "**Positioning** allows the badge content to be render in any of the four corners by toggling the `alignLeft` and `alignBottom` props. By default the flags are `false` and the badge origin with be in the top right corner unless an `align*` prop overrides it.",
        },
    },
};

const Circle = () => (
    <>
        <Badge badgeContent="99">
            <Avatar style={{backgroundColor: "#3f51b5"}}>
                <CalendarIcon className="icon-base" />
            </Avatar>
        </Badge>
        <Badge badgeContent="99" circle>
            <Avatar style={{backgroundColor: "#3f51b5"}}>
                <CalendarIcon className="icon-base" />
            </Avatar>
        </Badge>
    </>
);
Circle.parameters = {
    docs: {
        description: {
            story:
            "**Circle Badges** render the badge content in an alternate position so that it overlays it's children at a uniform position. This should only be used when the child container is a circle. This functionality leverage by setting the `circle` prop to `true`.",
        },
    },
};

const ShowEmpty = Template.bind({});
ShowEmpty.args =  {
    ...AvatarBadge.args,
    badgeContent: "",
    showFalsy: true
}

ShowEmpty.parameters = {
    docs: {
        description: {
            story:
            "**Empty Badges** can display falsy values ___(ie: '' or 0)___ when the `showFalsy` prop is `true`.",
        },
    },
};

export {Base, AvatarBadge, Position, Circle, ShowEmpty};

const def = {
    component: Badge,
    title: "Badge",
    parameters: {
        docs: {
            description: {
                component: `### Badge`,
            },
        },
        actions: {argTypesRegex: "^on.*"},
    },
    decorators: [
        (Story) => (
            <div className="flex flex--center" style={{width: "100%", height: "100px"}}>
                <Story />
            </div>
        ),
    ],
};

export default def;
