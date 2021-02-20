import React, { useState, useEffect, useRef, useContext } from 'react';
import { db, CONFIG } from '../../util/db';
import FormTemplate from './FormTemplate.js';
import { Formik } from 'formik';
import { ConfigContext } from '../../util/contexts';

const ConfigForm = () => {
    const [bgConfig, setBgConfig] = useState({});
    const [loaded, setLoaded] = useState(false);
    const { bg, setBg } = useContext(ConfigContext);

    useEffect(() => {
        async function onMount() {
            const bgData = await db.collection(CONFIG).doc('bg').get();
            bgData.usingImg = true; // testing only
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
                onSubmit={(values, action) => {
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

const ColorPicker = (props) => {
    return (
        <div>
            <label for="bgColor">Background Color:</label>
            <input
                type="color"
                id="bgColor"
                name="bgColor"
                value={props.values.color}
                onChange={(e) => props.setFieldValue('color', e.target.value)}
            />
        </div>
    )
}

const ImagePicker = (props) => {
    const preview = useRef();
    const [selectedImg, setSelectedImg] = useState(props.values.image);

    // TODO: Add a Tint option to add overlay above Image

    useEffect(() => { 
        preview.current.src = selectedImg;
        props.setFieldValue('image', selectedImg);
    }, [selectedImg])

    const dropHandler = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const fr = new FileReader();
        fr.onload = () => {
            console.log(fr.result)
            setSelectedImg(fr.result.replace(/(\r\n|\n|\r)/gm, ""))
        };
        fr.readAsDataURL(file);

    }

    return (
        <div style={imgPickerStyle.dropZone} onDrop={(e) => dropHandler(e)} onDragOver={(e) => e.preventDefault()}>
            <img ref={preview} style={{...imgPickerStyle.img, opacity: selectedImg ? 1 : 0}}></img>
            <p>Drag one or more files to this Drop Zone ...</p>
        </div>
    )
}
const imgPickerStyle = {
    dropZone: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        border: '5px solid blue',
        width: '200px',
        height: '100px',
    },
    img: {
        position: 'absolute',
        width: '200px',
        height: '100px',
    }
}

export default ConfigForm;