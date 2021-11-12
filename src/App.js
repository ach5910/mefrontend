import React, {useState, useCallback, useRef} from "react";
import logo from "./logo.svg";
import bem from "bembo";
import "./App.css";
import "./styles/partials/_center.scss";
// import Chip from './components/common/Chip';
// import Input from './components/Input/Input';
import Chip from "./ui/Chip";
import AddIcon from "./ui/Icons/AddIcon";
import Button from "./ui/Button";
import {noop, useSet, stopAllPropagation} from "./utils";
import Checkbox from "./ui/Checkbox";
import Radio from "./ui/Radio";
import Toggle from "./ui/Toggle";
import Dialog from "./ui/Modal/Dialog";
import TooltipContainer from "./ui/Tooltip/TooltipContainer";
import Tooltip from "./ui/Tooltip";
import Menu from "./ui/Menu";
import MenuItem from "./ui/Menu/MenuItem";
import Select from "./ui/Select";
import Drawer, { DrawerHeader, DrawerSection } from "./ui/Drawer";
import MenuIcon from "./ui/Icons/MenuIcon";
import Tabs from "./ui/Tabs";
import DatePicker from "./ui/DatePicker";

// import Text/
const list = ["Aaron", "Mike", "Matt", "Greg", "Ben", "Nick", "John", "Joe", "Dan", "Andy", "Robert", "Zsachary"];
const components = ["Modal", "Select", "Tooltip", "Menu", "Toggle", "Radio", "Checkbox", "Input", "SearchInput", "Textarea", "Button", "Chip"]
const tabs = [{value: "Aaron", label: "Aaron"}, {value: "Mike", label: "Mike"}, {value: "Matt", label: "Matt"}, {value: "Greg", label: "Greg"}]
function App() {
    const menuAnchor = useRef(null);
    const [text, setText] = useState(
        "test value test value test value test value test value test value test value test value test value test value test value test value"
    );
    const [drawer, setDrawer] = useState(false);
    const [dateValue, setDateValue] = useState("2020-09-25")
    const [drawerItem, setDrawerItem] = useState("Modal")
    const [tab, setTab] = useState("Aaron");
    const [select1, _setSelect1] = useState("Ben")
    const [select, setSelect] = useSet(["Aaron"]);
    const [select2, setSelect2] = useSet(["Mike"]);
    const [select3, setSelect3] = useSet(["Joe"]);
    const [modal, setModal] = useState(false);
    const [menu, setMenu] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [checked, setChecked] = useState(false);
    const [radio, setRadio] = useState("Mike");

    const setSelect1 = useCallback(
        (val) => (e) => {
            stopAllPropagation(e);
            _setSelect1(val)
        }, [_setSelect1])

    const handleChange = useCallback(
        (e) => {
            if (e.persist) e.persist();
            console.log("change", e.target.value);
            setText(e.target.value);
        },
        [setText]
    ); 
    return (
        <div className="flex" style={{"width": "100%", alignItems: "flex-start"}}>
        <TooltipContainer>
            <button onClick={() => setDrawer(true)} className={`${bem("btn").m("text")} absolute-container`} style={{width: "50px", height: "50px", "transform": "translate(40px, 40px)"}}>
                <MenuIcon />
            </button>
            <Drawer open={drawer} handleClose={() => setDrawer(false)}>
                <DrawerHeader>
                    <div className="flex flex--center flex--col">
                        <h5>Mefronend</h5>
                        <caption>ach5910</caption>
                    </div>
                </DrawerHeader>
                <DrawerSection label="Components">
                    {components.map(c => (
                        <MenuItem label={c} selected={c == drawerItem} handleSelect={() => setDrawerItem(c)}/>
                    ))}
                </DrawerSection>
            </Drawer>
            <div className="flex flex--center flex--col" style={{flex: "1",paddingTop: "100px", overflow: "auto"}}>
                <Dialog handleClose={() => setModal(false)} open={modal} />
                <h6 style={{textAlign: "center", margin: "18px"}}>Modal</h6>
                <div className="flex">
                    <Button label="Open Modal" onClick={() => setModal(true)} />
                </div>
                <DatePicker value={dateValue} handleChange={setDateValue}/>
                <h6 style={{textAlign: "center", margin: "18px"}}>Tabs</h6>
                <div className="flex">
                    <Tabs tabs={tabs} active={tab} handleClick={(v) => setTab(v)}/>
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Select Input - Default Text</h6>
                <div className="flex" style={{width: "200px"}}>
                    <Select
                        value={select1}
                        options={list}
                    >
                        <Menu handleSelect={setSelect1}/>
                    </Select>
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Multi-Select Input - Default Text</h6>
                <div className="flex" style={{width: "200px"}}>
                    <Select
                        value={select3}
                        options={list}
                    >
                        <Menu handleSelect={setSelect3}/>
                    </Select>
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Multi-Select Input - Render Chip</h6>
                <div className="flex" style={{width: "200px"}}>
                    <Select
                        value={select}
                        options={list}
                        renderValue={(name) => <Chip label={name} remove onClick={setSelect(name)} />}
                    >
                        <Menu handleSelect={setSelect}/>
                    </Select>
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Multi-Select Input - Default Chip</h6>
                <div className="flex" style={{width: "200px"}}>
                    <Select
                        value={select2}
                        options={list}
                        chips
                        handleRemove={setSelect2}
                    >
                        <Menu handleSelect={setSelect2}/>
                    </Select>
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Tooltip</h6>
                <div className="flex">
                    <Tooltip label="Left" position="left">
                        <p style={{margRight: "16px"}}>Left</p>
                    </Tooltip>
                    <Tooltip label="Top" position="top">
                        <p style={{margin: "0px 16px"}}>Top</p>
                    </Tooltip>
                    <Tooltip label="Bottom" position="bottom">
                        <p style={{margin: "0px 16px"}}>Bottom</p>
                    </Tooltip>
                    <Tooltip label="Right" position="right">
                        <p style={{marginLeft: "16px"}}>Right</p>
                    </Tooltip>
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Toggle</h6>
                <div className="flex">
                    <Toggle id="enabled-toggle" checked={toggle} handleChange={() => setToggle((t) => !t)} />
                    <Toggle disabled checked={toggle} handleChange={() => setToggle((t) => !t)} />
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Checkbox</h6>
                <div className="flex">
                    <Checkbox checked={checked} handleChange={() => setChecked((c) => !c)} />
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Radio</h6>
                <div className="flex">
                    <Radio
                        value="Mike"
                        id="mike-radio"
                        checked={radio == "Mike"}
                        label="Mike"
                        handleChange={(e) => setRadio(e.target.value)}
                        name="names"
                    />
                    <Radio
                        value="Joe"
                        id="joe-radio"
                        checked={radio == "Joe"}
                        label="Joe"
                        handleChange={(e) => setRadio(e.target.value)}
                        name="names"
                    />
                    <Radio
                        value="Greg"
                        id="greg-radio"
                        checked={radio == "Greg"}
                        label="Greg"
                        handleChange={(e) => setRadio(e.target.value)}
                        name="names"
                    />
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Menu</h6>
                <div ref={menuAnchor} className="flex">
                    <Button label="Open Menu" onClick={() => setMenu(true)} />
                    <Menu open={menu} options={list} anchorRef={menuAnchor} handleClose={() => setMenu(false)}>
                        {(name) => <MenuItem label={name} selected={name == "Aaron"} />}
                    </Menu>
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Input Chips with Avatar</h6>
                <div className="flex">
                    <Chip label="Aaron" remove Avatar={AddIcon} />
                    <Chip label="Aaron" remove Avatar={AddIcon} disabled />
                    <Chip label="Aaron" selected remove Avatar={AddIcon} />
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Input Chips Text Only</h6>
                <div className="flex">
                    <Chip label="Aaron" remove />
                    <Chip label="Aaron" remove disabled />
                    <Chip label="Aaron" selected remove />
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Filtration chips with Avatar</h6>
                <div className="flex">
                    <Chip label="Aaron" Avatar={AddIcon} />
                    <Chip label="Aaron" Avatar={AddIcon} disabled />
                    <Chip label="Aaron" selected Avatar={AddIcon} />
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Filtration chips text only</h6>
                <div className="flex">
                    <Chip label="Aaron" />
                    <Chip label="Aaron" disabled />
                    <Chip label="Aaron" selected />
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Choice Chips</h6>
                <div className="flex flex--center">
                    <Chip label="Aaron" />
                    <Chip label="Aaron" activated />
                    <Chip label="Aaron" disabled />
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Action Chips</h6>
                <div className="flex flex--center">
                    <Chip label="Aaron" Avatar={AddIcon} />
                    <Chip label="Aaron" Avatar={AddIcon} disabled />
                </div>
                <div style={{margin: "0px auto", width: "75vw"}}>
                    <h6 style={{textAlign: "center", margin: "18px"}}>Button Primary</h6>
                    <div className="flex flex--center">
                        <Button label="Submit" onClick={noop} />
                        <Button label="Submit" onClick={noop} disabled />
                        <Button label="Submit" onClick={noop} round style={{marginLeft: "48px"}}/>
                        <Button label="Submit" onClick={noop} round disabled />
                    </div>
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Secondary Button</h6>
                <div className="flex flex--center">
                    <Button label="Submit" onClick={noop} secondary />
                    <Button label="Submit" onClick={noop} secondary disabled />
                    <Button label="Submit" onClick={noop} secondary round />
                    <Button label="Submit" onClick={noop} secondary round disabled />
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Text Button</h6>
                <div className="flex flex--center">
                    <Button label="Submit" onClick={noop} variant="text" />
                    <Button label="Submit" onClick={noop} variant="text" disabled />
                    <Button label="Submit" onClick={noop} round variant="text" />
                    <Button label="Submit" onClick={noop} round variant="text" disabled />
                </div>
                <h6 style={{textAlign: "center", margin: "18px"}}>Outline Button</h6>
                <div className="flex flex--center">
                    <Button label="Submit" onClick={noop} variant="outline" />
                    <Button label="Submit" onClick={noop} variant="outline" disabled />
                    <Button label="Submit" onClick={noop} round variant="outline" />
                    <Button label="Submit" onClick={noop} round variant="outline" disabled />
                </div>
            </div>
        </TooltipContainer>
        </div>
    );
}

export default App;

//import React from 'react';
// import Button from '@bit/ach5910.mefrontend.button';

// const noop = () => {};
// export default (
// 	<div style={{width: "100vw"}}>
// 		<h6 style={{textAlign: "center", margin: "10px"}}>Button Primary</h6>
// 		<div className="flex flex--center">
// 				<Button label="Submit" onClick={noop} />
// 				<Button label="disable" onClick={noop} disabled />
// 				<Button label="Submit" onClick={noop}  className="btn--round" />
// 				<Button label="Disabled" onClick={noop} className="btn--round" disabled />
// 		</div>
// 		<h6 style={{textAlign: "center", margin: "10px"}}>Secondary Button</h6>
// 		<div className="flex flex--center">
// 				<Button label="Submit" onClick={noop} className="btn--secondary" />
// 				<Button label="Disabled" onClick={noop} className="btn--secondary" disabled />
// 				<Button label="Submit" onClick={noop} className="btn--secondary btn--round" />
// 				<Button label="Disabled" onClick={noop} className="btn--secondary btn--round" disabled />
// 		</div>
// 		<h6 style={{textAlign: "center", margin: "10px"}}>Text Button</h6>
// 		<div className="flex flex--center">
// 				<Button label="Submit" onClick={noop} className="btn--text" />
// 				<Button label="Disabled" onClick={noop} className="btn--text" disabled />
// 				<Button label="Submit" onClick={noop} className="btn--text btn--round" />
// 				<Button label="Disabled" onClick={noop} className="btn--text btn--round" disabled />
// 		</div>
// 		<h6 style={{textAlign: "center", margin: "10px"}}>Outline Button</h6>
// 		<div className="flex flex--center">
// 				<Button label="Submit" onClick={noop} className="btn--outline" />
// 				<Button label="Disabled" onClick={noop} className="btn--outline" disabled />
// 				<Button label="Submit" onClick={noop} className="btn--outline btn--round" />
// 				<Button label="Disabled" onClick={noop} className="btn--outline btn--round" disabled />
// 		</div>
// 	</div>
// )
