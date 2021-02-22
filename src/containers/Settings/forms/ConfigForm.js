import React, { useState, useEffect, useContext } from 'react';
import { db, CONFIG } from '../../../util/db';
import { BG as bgDefault } from '../../../util/defaults';
import FormTemplate from '../FormTemplate.js';
import { Formik } from 'formik';
import { ConfigContext } from '../../../util/contexts';
import ColorPicker from './Config_ColorPicker';
import ImagePicker from './Config_ImagePicker';

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
                    <form onSubmit={props.handleSubmit}>
                        <div>
                            <h2>Appearance</h2>
                            <div>
                                <h3>Background Style: </h3>
                                <input
                                    type="radio"
                                    id="usingColor"
                                    name="usingColor"
                                    value={!props.values.usingImg}
                                    checked={!props.values.usingImg}
                                    onChange={() => props.setFieldValue('usingImg', false)}
                                />
                                <label for="usingColor">Color</label>
                                <input
                                    type="radio"
                                    id="usingImg"
                                    name="usingImg"
                                    value={props.values.usingImg}
                                    checked={props.values.usingImg}
                                    onChange={() => props.setFieldValue('usingImg', true)}
                                />
                                <label for="usingImg">Image</label>
                                {props.values.usingImg ? <ImagePicker {...props} /> : <ColorPicker {...props} />}
                            </div>
                            <div>
                                <h3>Background Filter: </h3>
                                <select
                                    name="filterFn"
                                    id="filterFn"
                                    onChange={(e) => updateFilter(props, "fn", e.target.value)}
                                    style={{ textTransform: 'capitalize' }}
                                    value={props.values.filter.fn}
                                >
                                    {filterFnList.map(fn => <option key={fn} value={fn}>{fn}</option>)}
                                </select>
                                <input
                                    name="value"
                                    type="text"
                                    placeholder="Value"
                                    onChange={(e) => updateFilter(props, 'value', e.target.value)}
                                    value={props.values.filter.value}
                                    disabled={props.values.filter.fn === "none"}
                                />
                            </div>
                        </div>
                        <button type="submit">Update</button>
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

export default ConfigForm;