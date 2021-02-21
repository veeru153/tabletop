import React from 'react';

const ColorPicker = (props) => {
    return (
        <div>
            <label for="bgColor">Background Color:</label>
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