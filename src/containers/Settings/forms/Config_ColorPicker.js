import React from 'react';
import classes from './ConfigForm.module.css';

const ColorPicker = (props) => {
    return (
        <div className={classes.colorPicker}>
            <input
                type="color"
                id="bgColor"
                name="bgColor"
                value={props.values.color}
                onChange={(e) => props.setFieldValue('color', e.target.value)}
            />
        </div>
    )
}

export default ColorPicker;