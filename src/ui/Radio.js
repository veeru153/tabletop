import React from 'react';
import classes from './Radio.module.css'

const Radio = (props) => {
    return (
        <div className={classes.Radio}>
            <label className={props.checked ? classes.active : ""} style={props.style}>
                <input
                    type="radio"
                    {...props}
                />
                {props.label}
            </label>
        </div>
    )
}

export default Radio;