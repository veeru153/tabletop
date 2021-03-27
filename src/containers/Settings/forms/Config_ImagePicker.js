import React, { useState, useEffect, useRef } from 'react';
import classes from './ConfigForm.module.css';
import { TextInput, Dropdown, Radio } from '../../../ui';

const ImagePicker = (props) => {
    const [selectedImg, setSelectedImg] = useState(props.values.image);

    useEffect(() => {
        props.setFieldValue('image', selectedImg);
    }, [selectedImg])

    const dropHandler = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const fr = new FileReader();
        fr.onload = () => {
            setSelectedImg(fr.result.replace(/(\r\n|\n|\r)/gm, ""))
        };
        fr.readAsDataURL(file);
    }

    const updateBlend = async (props, type, val) => {
        const tempBlend = props.values.blend;
        if (type === 'mode') tempBlend.mode = val;
        if (type === 'color') tempBlend.color = val;
        props.setFieldValue('blend', tempBlend);
    }

    return (
        <div>
            <div className={classes.styleSelection}>
                <h3>Source: </h3>
                <div>
                    <Radio
                        label="Local"
                        name="local"
                        value={props.values.localImg}
                        checked={props.values.localImg}
                        onChange={() => props.setFieldValue('localImg', true)}
                        style={styles.radioBtn}
                    />
                </div>
                <div>
                    <Radio
                        label="Picsum"
                        name="picsum"
                        value={!props.values.localImg}
                        checked={!props.values.localImg}
                        onChange={() => props.setFieldValue('localImg', false)}
                        style={styles.radioBtn}
                    />
                </div>
            </div>
            {props.values.localImg ? <LocalImagePicker selectedImg={selectedImg} dropHandler={dropHandler} /> : <p>BETA: Random Image provided by Picsum. Falls back to local image if Internet connection is not available. Falls back to solid color if no local image is provided.</p>}
            <div>
                <h3>Background Blend: </h3>
                <div className={classes.fields}>
                    <Dropdown
                        name="filterFn"
                        onChange={(e) => updateBlend(props, "mode", e.target.value)}
                        style={{ textTransform: 'capitalize' }}
                        value={props.values.blend.mode}
                        options={blendModeList}
                    />
                    <TextInput
                        name="value"
                        placeholder="Color (Name, HEX, RGBA)"
                        onChange={(e) => updateBlend(props, "color", e.target.value)}
                        value={props.values.blend.color}
                        disabled={props.values.blend.mode === "normal"}
                        style={styles.textInput}
                    />
                </div>
            </div>
        </div>
    )
}

const LocalImagePicker = (props) => {
    const { selectedImg, dropHandler } = props;
    const preview = useRef();

    useEffect(() => {
        preview.current.src = selectedImg;
    }, []);

    return (
        <>
            <div className={classes.imagePickerDropzone} onDrop={(e) => dropHandler(e)} onDragOver={(e) => e.preventDefault()}>
                <img
                    alt="Preview"
                    ref={preview}
                    style={{ display: selectedImg ? 'block' : 'none' }}
                ></img>
                <p style={{ display: selectedImg ? 'none' : 'block' }}>Drag an Image in this Dropzone</p>
            </div>
            <p style={{ opacity: selectedImg ? 1 : 0 }}>Drag an Image in the above Dropzone to set as the background.</p>
        </>
    )
}

const styles = {
    textInput: {
        fontSize: 22,
        paddingBottom: 5,
    },
    radioBtn: {
        fontSize: '18.72px',
    },
}

const blendModeList = [
    "normal",
    "multiply",
    "overlay",
    "screen",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
]

export default ImagePicker;