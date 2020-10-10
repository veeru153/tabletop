import React from 'react';
import styles from './AddWidgetPanel.module.css';
import MyInput from '../UI/MyInput';
import { RadioGroup, FormControlLabel, Radio, makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import { WidgetConsumer } from '../Dashboard/contexts';
import { CovidSmall, CovidLarge } from '../Widget/wKey';

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
        <WidgetConsumer>
            {(addWidget) => (
                <Formik
                    initialValues={{ territory: '', district: '', type: "small" }}
                    onSubmit={(values, actions) => {
                        console.log(values);
                        if(values.type === "small") {
                            addWidget(CovidSmall, [values.territory, values.district]);
                        } else {
                            addWidget(CovidLarge, [values.territory, values.district]);
                        }
                        actions.resetForm();
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
                                    control={<Radio classes={{ root: classes.root, checked: classes.checked }} />}
                                    label="Small (Confirmed Only)"
                                    onChange={() => props.setFieldValue('type', 'small')}
                                />
                                <FormControlLabel
                                    value="large"
                                    control={<Radio classes={{ root: classes.root, checked: classes.checked }} />}
                                    label="Large (Confirmed, Active, Recovered, Deceased)"
                                    onChange={() => props.setFieldValue('type', 'large')}
                                />
                            </RadioGroup>

                            <p></p>
                            <button className={styles.addBtn} type="submit">ADD</button>
                        </form>
                    )}
                </Formik>
            )}
        </WidgetConsumer>
    )
}

export default AddCovid;