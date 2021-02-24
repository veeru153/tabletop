import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
    return (
        <button {...props} disabled={props.disabled} className={classes.Button} style={props.style}>
            {props.children}
        </button>
    )
}

export default Button;