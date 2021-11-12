import React, {useState} from "react";

import Drawer from "./index";
import Button from "../Button";
import DrawerHeader from "./DrawerHeader";
import DrawerSection from "./DrawerSection";
import MenuItem from "../Menu/MenuItem";
import {noop} from "../../utils";
import useMediaQuery from "../../utils/useMediaQuery";

const components = [
    "Modal",
    "Select",
    "Tooltip",
    "Menu",
    "Drawer",
    "Toggle",
    "Radio",
    "Checkbox",
    "Input",
    "SearchInput",
    "Textarea",
    "Button",
    "Chip",
];

const drawerStyle = {height: "100%"};
function Base({style, wrapperStyle, open:o}) {
    const [open, setOpen] = useState(o);
    const isLargeScreen = useMediaQuery("only screen and (min-width : 993px)");

    return (
        <>
            <Drawer style={style} wrapperStyle={wrapperStyle} open={open} handleClose={() => setOpen(false)}>
                <DrawerHeader>
                    <div className="flex flex--center flex--col">
                        <h5>Mefronend</h5>
                        <caption>ach5910</caption>
                    </div>
                </DrawerHeader>
                <DrawerSection label="Components">
                    {components.map((c) => (
                        <MenuItem
                            key={`drawer--story--menu-item--${c}`}
                            label={c}
                            selected={c == "Drawer"}
                            handleSelect={noop}
                        />
                    ))}
                </DrawerSection>
            </Drawer>
            <Button
                label="Toggle Drawer"
                disabled={isLargeScreen}
                onClick={() => setOpen((o) => !o)}
            />
        </>
    );
}

Base.args = {
    style: drawerStyle,
    wrapperStyle: drawerStyle,
    open: false,
}

// function MobileDrawer() {
//     const [open, setOpen] = useState(false);

//     return (
//         <div className="flex flex--center flex--col" style={{width: "100%"}}>
//         <MobileSandbox>
//             {()  => (
//                 <>
//                 <Drawer style={drawerStyle} wrapperStyle={drawerStyle} open={open} handleClose={() => {
//                     console.log('handleClose')
//                     setOpen(false)
//                     }}>
//                     <DrawerHeader>
//                         <div className="flex flex--center flex--col">
//                             <h5>Mefronend</h5>
//                             <caption>ach5910</caption>
//                         </div>
//                     </DrawerHeader>
//                     <DrawerSection label="Components">
//                         {components.map((c) => (
//                             <MenuItem
//                                 key={`drawer--story--menu-item--${c}`}
//                                 label={c}
//                                 selected={c == "Drawer"}
//                                 handleSelect={noop}
//                             />
//                         ))}
//                     </DrawerSection>
//                 </Drawer>
//                 <Button
//                     style={{position: "absolute", left: "50%", top: "50%"}}
//                     label="Toggle Modal"
//                     onClick={() => setOpen((o) => !o)}
//                 />
//                 </>
//             )}
//         </MobileSandbox>
//         </div>
//     );
// }

// const Base = Template.bind({});
// Base.args = {
//     min: 0,
//     max: 100,
// };

export {Base};

const def = {
    component: Drawer,
    title: "Drawer",
    parameters: {
        docs: {
            description: {
                component: `### Drawers are used to render a menu that is collapsible on mobile and tablet screens.`
            }
        },
        actions: {argTypesRegex: "^on.*"},
    },
    decorators: [
        (story) => (
            <div
                className="flex flex--center"
                style={{
                    position: "relative",
                    overflow: "hidden",
                    left: "0px",
                    top: "0px",
                    width: "100%",
                    height: "700px",
                }}
            >
                {story()}
            </div>
        ),
    ],
};

export default def;
