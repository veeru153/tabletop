import React from 'react';
import classes from './Page.module.scss';

// Option for Settings Pages
const Option = ({ name, icon, next = () => {} }) => {
    return (
        <div className={classes.Option} onClick={next}>
            <div>{icon}</div>
            <h2>{name}</h2>
        </div>
    )
}

export default Option;