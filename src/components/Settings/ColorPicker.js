import React from 'react';
import styles from './Settings.module.css';

const ColorPicker = (props) => {
    return (
        <div>
            <h3>Color Picker</h3>
            <input
                type="color"
                value={props.values.bgContent}
                onChange={(e) => props.setFieldValue('bgContent', e.target.value)}
                className={styles.bgColorPreview}
            />
        </div>
    )
}

export default ColorPicker;