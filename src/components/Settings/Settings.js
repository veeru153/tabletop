import React, { useState, useEffect } from 'react';
import MyInput from '../UI/MyInput';
import { Formik } from 'formik';
import { RadioGroup, FormControlLabel, Radio, makeStyles } from '@material-ui/core';
import styles from './Settings.module.css';
import ColorPicker from './ColorPicker';
import ImageChooser from './ImageChooser';

const useRadioStyles = makeStyles({
    root: {
        color: 'lightgrey',
        '&$checked': {
            color: 'lightgrey'
        }
    },
    checked: {}
})

const Settings = (props) => {
    const classes = useRadioStyles();
    const { expanded, toggleSettings, updateSettings } = props;

    const OPM_KEY = localStorage.getItem('opmKey');
    const BG_CONTENT = localStorage.getItem('bgContent');

    return (
        <div className={styles.container} style={{
            transform: expanded ? `translateY(0%)` : `translateY(100%)`,
        }}>
            <div></div>
            <div style={{ display: expanded ? 'block' : 'none', }}>
                <div className={styles.Settings}>
                    <h1>Settings</h1>
                    <Formik
                        initialValues={{
                            bgType: 'color',
                            bgContent: BG_CONTENT ?? '#282c34',
                            opmKey: OPM_KEY ?? ''
                        }}
                        onSubmit={ async (values, actions) => {
                            console.log(values)
                            if ('bgType' === 'default') {
                               localStorage.setItem('bgContent', '#282c34');
                            } else {
                                localStorage.setItem('bgContent', values.bgContent);
                            }
                            localStorage.setItem('opmKey', values.opmKey);

                            updateSettings();
                            toggleSettings();
                        }}
                    >
                        {(props) => (
                            <form className={styles.form} onSubmit={props.handleSubmit}>
                                <h2>Appearance</h2>

                                <div className={styles.bgSection}>
                                    <div>
                                        <h3>Background</h3>
                                        <RadioGroup name="type" defaultValue="color">
                                            <FormControlLabel
                                                value="color"
                                                control={<Radio classes={{ root: classes.root, checked: classes.checked }} />}
                                                label="Solid Color"
                                                onChange={() => props.setFieldValue('bgType', 'color')}
                                            />
                                            <FormControlLabel
                                                value="image"
                                                control={<Radio classes={{ root: classes.root, checked: classes.checked }} />}
                                                label="Image"
                                                onChange={() => props.setFieldValue('bgType', 'image')}
                                            />
                                            {/* <FormControlLabel
                                                value="default"
                                                control={<Radio classes={{ root: classes.root, checked: classes.checked }} />}
                                                label="Default"
                                                onChange={() => props.setFieldValue('bgType', 'default')}
                                            /> */}
                                        </RadioGroup>
                                    </div>
                                    {props.values.bgType === 'color'
                                        ? <ColorPicker values={props.values} setFieldValue={props.setFieldValue} />
                                        : props.values.bgType === 'image'
                                            ? <ImageChooser values={props.values} setFieldValue={props.setFieldValue} />
                                            : <div></div>
                                    }
                                </div>

                                <h2>Tokens (Keep these secret!)</h2>
                                <MyInput
                                    label="OpenWeatherMaps Key"
                                    value={props.values.opmKey}
                                    onChange={props.handleChange('opmKey')}
                                    config={{
                                        type: "password",
                                        required: true,
                                    }}
                                />
                                <p></p>
                                <button className={styles.addBtn} type="submit">UPDATE</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default Settings;