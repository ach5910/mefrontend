import React, { useState } from "react";

import Tooltip, { BOTTOM, LEFT, RIGHT, TOP } from "./index";
import TooltipContainer from "./TooltipContainer";

function Template(args) {
    if (args?.tooltips) {
        return (
            <div className="flex" style={{width: "75%", justifyContent: "space-between", alignItems: "center"}}>
                {args.tooltips.map(({label, position}) => (
                    <Tooltip key={`tooltip--${label}--${position}`} label={label} position={position}>
                        <p >{label}</p>
                    </Tooltip>
                ))}
            </div>
        )
    }
    return (
        <Tooltip {...args}>
            <p >Wrapped Content</p>
        </Tooltip>
    )
}

const Base = Template.bind({});
Base.args = {
    label: "Tooltip Text",
    position: LEFT
};

const Positions = Template.bind({});
Positions.args = {
    tooltips: [
        {
            label: "Left",
            position: LEFT
        },
        {
            label: "Top",
            position: TOP
        },
        {
            label: "Bottom",
            position: BOTTOM 
        },
        {
            label: "Right",
            position: RIGHT
        },
    ]
}

export {Base, Positions}

const def = {
    component: Tooltip,
    title: "Tooltip",
    parameters: {
      docs: {
        description: {
          component: `### Tooltips provide helper text when hovering over certain content.`
        }
      },
      actions: {argTypesRegex: "^on.*"}
    },
    decorators: [
        (story) => (
            <div className="flex flex--center" style={{width:"100%", height: "100%"}}>
                <TooltipContainer>
                    {story()}
                </TooltipContainer>
            </div>
        )
    ],
};

export default def;