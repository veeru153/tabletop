import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const inputStyles = makeStyles({
    root: {
        margin: '16px 0',
    },
    notchedOutline: {
        borderColor: 'lightgrey !important',
    },
    cssLabel: {
        color: 'lightgrey !important'
    },
    input: {
        color: 'lightgrey !important'
    },
})

const MyInput = (props) => {
    const { label, value, onChange, config, inputProps } = props;
    const classes = inputStyles();
    return (
        <TextField
            className={classes.root}
            label={label}
            value={value}
            onChange={onChange}
            variant="outlined"
            InputProps={{
                ...inputProps,
                classes: {
                    root: classes.cssLabel,
                    notchedOutline: classes.notchedOutline,
                },
            }}
            InputLabelProps={{
                classes: {
                    root: classes.cssLabel,
                    focused: classes.cssLabel,
                },
            }}
            {...config}
        />
    )
}

export default MyInput;