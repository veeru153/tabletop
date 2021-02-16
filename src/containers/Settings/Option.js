import React, { useContext } from 'react';
import { NavContext } from '../../util/contexts';
import classes from './Settings.module.css';

const Option = ({ opt }) => {
    const { pageStack, setPageStack } = useContext(NavContext);

    const addPageToStack = (next) => {
        if(!next) return;
        setPageStack([...pageStack, next]);
    }

    return (
        <div 
            className={classes.option}
            onClick={() => addPageToStack(opt.next)}
        >
            <div></div>
            <div>{opt.name}</div>
        </div>
    )
}

export default Option;