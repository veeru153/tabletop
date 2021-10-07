import React, { useState, useEffect, useContext } from 'react';
import classes from './Background.module.scss';
import { Formik } from 'formik';
import { ConfigContext } from '../../../../../common/util/contexts';
import ColorPicker from './ColorPicker';
import ImagePicker from './ImagePicker';
import VideoPicker from './VideoPicker';
import { TextInput, Dropdown, Button, Radio, Page } from '../../../../../common/ui';

const Background = () => {
    const { bg } = useContext(ConfigContext);
    const [bgConfig, setBgConfig] = useState(bg);
    const [loaded, setLoaded] = useState(false);
    const { setBg } = useContext(ConfigContext);

    useEffect(() => {
        async function onMount() {
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
        <Page 
            title="Background"
            subtitle="Your New Tab deserves to look pretty!"
        >
            {loaded ? <Formik
                initialValues={bgConfig}
                onSubmit={async (values) => {
                    if(values.type == 2) return;
                    setBg(values);
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit} className={classes.form}>
                        <div>
                            <div>
                                <div className={classes.styleSelection}>
                                    <h3>Style: </h3>
                                    <div>    
                                        <Radio
                                            label="Color"
                                            name="color"
                                            value={props.values.type}
                                            checked={props.values.type === 0}
                                            onChange={() => props.setFieldValue('type', 0)}
                                            style={styles.radioBtn}
                                        />
                                    </div>
                                    <div>
                                        <Radio
                                            label="Image"
                                            name="imageSrcs"
                                            value={props.values.type}
                                            checked={props.values.type === 1}
                                            onChange={() => props.setFieldValue('type', 1)}
                                            style={styles.radioBtn}
                                        />
                                    </div>
                                    <div>
                                        <Radio
                                            label="Video"
                                            name="videoSrcs"
                                            value={props.values.type}
                                            checked={props.values.type === 2}
                                            onChange={() => props.setFieldValue('type', 2)}
                                            style={styles.radioBtn}
                                        />
                                    </div>
                                </div>
                                {(props.values.type === 0) 
                                    ? <ColorPicker {...props} /> 
                                    : (props.values.type === 1 
                                            ? <ImagePicker {...props} />  
                                            : <VideoPicker {...props} />)}
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
        </Page>
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
        fontSize: '18.72px',
    },
    textInput: {
        fontSize: 22,
        paddingBottom: 5,
    },
    updateBtn: {
        margin: '30px auto',
    }
}

export default Background;