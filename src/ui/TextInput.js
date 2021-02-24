import React from 'react';
import classes from './TextInput.module.css';

const TextInput = (props) => {
    return (
        <input 
            className={classes.TextInput}
            type="text"
            autoComplete="off"
            {...props}
        />
    )
}

export default TextInput;