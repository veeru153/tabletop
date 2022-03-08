import React, { Suspense } from 'react';
import classes from './Background.module.scss';
import { useRecoilState } from 'recoil';
import { bgAtom } from '../../../../../common/atoms/config';
import { Formik } from 'formik';
import ColorPicker from './ColorPicker';
import ImagePicker from './ImagePicker';
import VideoPicker from './VideoPicker';
import { TextInput, Dropdown, Button, Radio, Page } from '../../../../../common/ui';

const Background = () => {
    return (
        <Page
            title="Background"
            subtitle="Your New Tab deserves to look pretty!"
        >
            <Suspense fallback={<div />}>
                <BackgroundPage />
            </Suspense>
        </Page>
    )
}

const BackgroundPage = () => {
    const [bgConfig, setBgConfig] = useRecoilState(bgAtom);

    const updateFilter = async (props, type, val) => {
        const tempFilter = props.values.filter;
        if (type === 'fn') tempFilter.fn = val;
        if (type === 'value') tempFilter.value = val;
        props.setFieldValue('filter', tempFilter);
    }

    return (
        <Formik
            initialValues={bgConfig}
            onSubmit={async (values) => {
                setBgConfig(values);
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
                                    ? <Suspense fallback={<div />}><ImagePicker {...props} /></Suspense>
                                    : <Suspense fallback={<div />}><VideoPicker {...props} /></Suspense>)}
                        </div>
                        <div>
                            <h3>Background Filter: </h3>
                            <div className={classes.fields}>
                                <Dropdown
                                    name="filterFn"
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFilter(props, "fn", e.target.value)}
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
        </Formik>
    )
}

const filterFnList = [
    { label: "none", value: "none" },
    { label: "blur", value: "blur" },
    { label: "brightness", value: "brightness" },
    { label: "contrast", value: "contrast" },
    { label: "drop-shadow", value: "drop-shadow" },
    { label: "grayscale", value: "grayscale" },
    { label: "hue-rotate", value: "hue-rotate" },
    { label: "invert", value: "invert" },
    { label: "opacity", value: "opacity" },
    { label: "saturate", value: "saturate" },
    { label: "sepia", value: "sepia" },
    { label: "url", value: "url" },
]

const styles: Record<string, React.CSSProperties> = {
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