import React, { useState, useEffect, useContext } from 'react';
import classes from './ConfigForm.module.css';
import { db, CONFIG } from '../../../util/db';
import { BG as bgDefault } from '../../../util/defaults';
import FormTemplate from '../FormTemplate.js';
import { Formik } from 'formik';
import { ConfigContext } from '../../../util/contexts';
import ColorPicker from './Config_ColorPicker';
import ImagePicker from './Config_ImagePicker';
import { TextInput, Dropdown, Button, Radio } from '../../../ui';

const ConfigForm = () => {
    const [bgConfig, setBgConfig] = useState({});
    const [loaded, setLoaded] = useState(false);
    const { setBg } = useContext(ConfigContext);

    useEffect(() => {
        async function onMount() {
            const bgData = await db.collection(CONFIG).doc('bg').get();
            setBgConfig({ ...bgDefault, ...bgData });
            setLoaded(true);
        }
        onMount();
    }, [])

    const updateFilter = async (props, type, val) => {
        const tempFilter = props.values.filter;
        if (type === 'fn') tempFilter.fn = val;
        if (type === 'value') tempFilter.value = val;
        props.setFieldValue('filter', tempFilter);
    }

    return (
        <FormTemplate
            title="Configure"
            subtitle="Dashboard Configuration"
        >
            {loaded ? <Formik
                initialValues={bgConfig}
                onSubmit={(values) => {
                    setBg(values);
                    db.collection(CONFIG).doc('bg').set(values);
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit} className={classes.form}>
                        <div>
                            <h2>Appearance</h2>
                            <div>
                                <div className={classes.styleSelection}>
                                    <h3>Background Style: </h3>
                                    <div>    
                                        <Radio
                                            label="Color"
                                            name="usingColor"
                                            value={!props.values.usingImg}
                                            checked={!props.values.usingImg}
                                            onChange={() => props.setFieldValue('usingImg', false)}
                                            style={styles.radioBtn}
                                        />
                                    </div>
                                    <div>
                                        <Radio
                                            label="Image"
                                            name="usingImg"
                                            value={props.values.usingImg}
                                            checked={props.values.usingImg}
                                            onChange={() => props.setFieldValue('usingImg', true)}
                                            style={styles.radioBtn}
                                        />
                                    </div>
                                </div>
                                {props.values.usingImg ? <ImagePicker {...props} /> : <ColorPicker {...props} />}
                            </div>
                            <div>
                                <h3>Background Filter: </h3>
                                <div className={classes.fields}>
                                    <Dropdown
                                        name="filterFn"
                                        onChange={(e) => updateFilter(props, "fn", e.target.value)}
                                        style={{ textTransform: 'capitalize' }}
                                        value={props.values.filter.fn}
                                        options={filterFnList}
                                    />
                                    <TextInput
                                        name="value"
                                        placeholder="CSS Value"
                                        onChange={(e) => updateFilter(props, 'value', e.target.value)}
                                        value={props.values.filter.value}
                                        disabled={props.values.filter.fn === "none"}
                                        style={styles.textInput}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button type="submit" style={styles.updateBtn}>Update</Button>
                    </form>
                )}
            </Formik> : null}
        </FormTemplate>
    )
}

const filterFnList = [
    "none",
    "blur",
    "brightness",
    "contrast",
    "drop-shadow",
    "grayscale",
    "hue-rotate",
    "invert",
    "opacity",
    "saturate",
    "sepia",
    "url",
]

const styles = {
    radioBtn: {
        fontSize: '1.17em',
    },
    textInput: {
        fontSize: 22,
        paddingBottom: 5,
    },
    updateBtn: {
        margin: '30px auto',
    }
}

export default ConfigForm;