import React from 'react';
import styles from './AddWidgetPanel.module.css';
import MyInput from '../UI/MyInput';
import { RadioGroup, FormControlLabel, Radio, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';

const useRadioStyles = makeStyles({
    root: {
        color: 'lightgrey',
        '&$checked': {
            color: 'lightgrey'
        }
    },
    checked: {}
})

const AddCovid = () => {
    const classes = useRadioStyles();
    return (
        <Formik
            initialValues={{ territory: '', district: '', type: null }}
            onSubmit={(values, actions) => {
                console.log(values);
            }}
        >
            {(props) => (
            <form className={styles.AddWidgetPanel} onSubmit={props.handleSubmit}>
                <h1>Add Widget: COVID-19 India</h1>
                <MyInput 
                    label="State/Territory" 
                    value={props.values.territory}
                    onChange={props.handleChange('territory')}
                    config={{ required: true }}
                />
                <MyInput 
                    label="District" 
                    value={props.values.district}
                    onChange={props.handleChange('district')}
                    config={{ required: true }}
                />

                <h3>Type</h3>
                <RadioGroup name="type" defaultValue="small">
                    <FormControlLabel 
                        value="small" 
                        control={<Radio classes={{root: classes.root, checked: classes.checked}} />} 
                        label="Small (Confirmed Only)" 
                        onChange={() => props.setFieldValue('type', 'small')}
                    />
                    <FormControlLabel 
                        value="large" 
                        control={<Radio classes={{root: classes.root, checked: classes.checked}} />} 
                        label="Large (Confirmed, Active, Recovered, Deceased)" 
                        onChange={() => props.setFieldValue('type', 'large')}
                    />
                </RadioGroup>

                <p></p>
                <button className={styles.addBtn} type="submit">ADD</button>
            </form>
            )}
        </Formik>
    )
}

export default AddCovid;