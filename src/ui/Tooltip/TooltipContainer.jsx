import React, {useCallback } from 'react';
import {node} from 'prop-types';
import { useStateObject } from '../../utils';
import {TooltipContext, BOTTOM} from ".";
import TooltipInstance from './TooltipInstance';

const initState = {
    visible: false,
    rect: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
    },
    label: "",
    position: BOTTOM,
    padding: 8,
}


const TooltipContainer = ({children}) => {
    const [tooltip, setTooltip] = useStateObject(initState);

    const handleMouseEnter = useCallback(({position, label, padding, rect}) => {
        setTooltip({
            visible: true,
            rect,
            label,
            position,
            padding,
        })
    }, [setTooltip])

    const handleMouseLeave = useCallback(() => {
        setTooltip({visible: false})
    }, [setTooltip])

    return(
        <TooltipContext.Provider value={{onMouseEnter: handleMouseEnter, onMouseLeave:handleMouseLeave}}>
            {children}
            <TooltipInstance {...tooltip}/>
        </TooltipContext.Provider>
    )
}

TooltipContainer.propTypes = {
    children: node.isRequired
}

export default TooltipContainer;