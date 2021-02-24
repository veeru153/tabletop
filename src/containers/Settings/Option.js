import React, { useContext } from 'react';
import { NavContext } from '../../util/contexts';
import classes from './Settings.module.css';

const Option = ({ opt }) => {
    const { pageStack, setPageStack, level, setLevel } = useContext(NavContext);

    const addPageToStack = (next) => {
        if(!next) return;
        setPageStack([...pageStack, next]);
        setLevel(level + 1);
    }

    return (
        <div 
            className={classes.option}
            onClick={() => addPageToStack(opt.next)}
        >
            <div className={classes.iconContainer}>
                {opt.icon}
            </div>
            <h2 style={{ textAlign: 'center' }}>{opt.name}</h2>
        </div>
    )
}

export default Option;