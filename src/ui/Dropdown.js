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
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    )
}

export default Dropdown;