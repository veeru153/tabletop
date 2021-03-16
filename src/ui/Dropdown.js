import React from 'react';
import classes from './Dropdown.module.css';

const Dropdown = (props) => {
    const { options } = props;
    return (
        <select
            id={props.name}
            name={props.name}
            className={classes.Dropdown}
            onChange={props.onChange}
            style={props.style}
            value={props.value}
            defaultValue={props.defaultValue}
        >
            {options.map(opt => {
                const label = opt.label ?? opt;
                const val = opt.val ?? opt;
                return <option key={val} value={val}>{label}</option>
            })}
        </select>
    )
}

export default Dropdown;