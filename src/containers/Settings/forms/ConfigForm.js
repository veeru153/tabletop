import React, { useState, useEffect, useContext } from 'react';
import { db, CONFIG } from '../../../util/db';
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
            setBgConfig(bgData);
            setLoaded(true);
        }
        onMount();
    }, [])

    const updateBg = async (newBg) => {
        setBg(newBg);
        db.collection(CONFIG).doc('bg').set(newBg);
    }

    return (
        <FormTemplate
            title="Configure"
            subtitle="Dashboard Configuration"
        >
            {loaded ? <Formik
                initialValues={bgConfig}
                onSubmit={(values) => {
                    updateBg(values);
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <div>
                            <h2>Choose Style: </h2>
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
                        </div>
                        {props.values.usingImg ? <ImagePicker {...props} /> : <ColorPicker {...props} />}
                        <button type="submit">Update</button>
                    </form>
                )}
            </Formik> : null}
        </FormTemplate>
    )
}

export default ConfigForm;