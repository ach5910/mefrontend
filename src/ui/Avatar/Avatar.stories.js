import React from "react";

import Avatar from "./index";

import CalendarIcon from "../Icons/CalendarIcon";
import MenuIcon from "../Icons/MenuIcon";
import SearchIcon from "../Icons/SearchIcon";

const renderAvatar = ({content,  style={},...props}, i) => (
    props.src 
        ? <Avatar style={{...style, margin: `${i >= 0 ? "0.8rem": "0px"}`}} key={`avatar--${props.src}--${props.alt}--${i}`} {...props}/> 
        : (
            <Avatar style={{...style, margin: `${i >= 0 ? "0.8rem": "0px"}`}} key={`avatar--${content}--${i}`} {...props}>
                {content}
            </Avatar>
        )
)

function Template(args) {
    if (args.avatars){
        return args.avatars.map((props, i) => renderAvatar(props, i))
    }
    return renderAvatar(args, -1) ///checked={checked} onChange={() => setChecked(c => !c)} />;
}

const Base = Template.bind({})
Base.args = {
    src: "https://avatars3.githubusercontent.com/u/15445630?s=460&u=57c12922a481d9418b5bc3b1141e6e373af29341&v=4",
    alt: "Aaron's Github"
}

const ImageGroup = Template.bind({});
ImageGroup.args = {
    avatars : [
        {
            src: "https://avatars3.githubusercontent.com/u/15445630?s=460&u=57c12922a481d9418b5bc3b1141e6e373af29341&v=4",
            alt: "Aaron's Github"
        },
        {
            src: "https://avatars2.githubusercontent.com/u/5465789?s=460&u=273c6f0c928338a9c29b5f9d85d2bf734b59119a&v=4",
            alt: "Ben's Github"
        },
        {
            src: "https://avatars3.githubusercontent.com/u/20746155?s=460&u=629e0cdaa94facd672396835cce6f87ac0cb564d&v=4",
            alt: "Rob's Github"
        },
        {
            src: "https://avatars1.githubusercontent.com/u/2127441?s=460&u=8841c3fab4f344dbc92252936e95676ef568e11c&v=4",
            alt: "Brodie's Github"
        },
    ]
};

const AvatarInitials = Template.bind({});
AvatarInitials.args = {
    avatars : [
        {
            style: {backgroundColor: "orange"},
            content: "AH"
        },
        {
            style: {backgroundColor: "#03a9f4"},
            content: "BS"
        },
        {
            style: {backgroundColor: "pink"},
            content: "R"
        },
        {
            style: {backgroundColor: "purple"},
            content: "B"
        },
    ]
}

const AvatarIcons = Template.bind({});
AvatarIcons.args = {
    avatars : [
        {
            style: {backgroundColor: "#3f51b5"},
            content: <CalendarIcon/>
        },
        {
            style: {backgroundColor: "#009688"},
            content: <MenuIcon/>
        },
        {
            style: {backgroundColor: "#ff5722"},
            content: <SearchIcon/>
        },
    ]
}

export {Base, ImageGroup,  AvatarInitials, AvatarIcons}

const def = {
    component: Avatar,
    title: "Avatar",
    parameters: {
      docs: {
        description: {
          component: `### Avatar`
        }
      },
      actions: {argTypesRegex: "^on.*"}
    },
    decorators: [(story) => <div className="flex flex--center" style={{width: "100%", height: "100px"}}>{story()}</div>],
};

export default def;