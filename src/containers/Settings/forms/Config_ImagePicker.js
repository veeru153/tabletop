import React, { useState, useEffect, useRef } from 'react';
import classes from './ConfigForm.module.css';
import { TextInput, Dropdown } from '../../../ui';

const ImagePicker = (props) => {
    const preview = useRef();
    const [selectedImg, setSelectedImg] = useState(props.values.image);

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

    const updateBlend = async (props, type, val) => {
        const tempBlend = props.values.blend;
        if (type === 'mode') tempBlend.mode = val;
        if (type === 'color') tempBlend.color = val;
        props.setFieldValue('blend', tempBlend);
    }

    return (
        <div>
            <div className={classes.imagePickerDropzone} onDrop={(e) => dropHandler(e)} onDragOver={(e) => e.preventDefault()}>
                <img 
                    alt="Preview" 
                    ref={preview} 
                    style={{ opacity: selectedImg ? 1 : 0 }}
                ></img>
                <p style={{ display: selectedImg ? 'none' : 'block' }}>Drag an Image in this Dropzone</p>
            </div>
            <p style={{ opacity: selectedImg ? 1 : 0 }}>Drag an Image in the above Dropzone to set as the background.</p>
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

const styles = {
    textInput: {
        fontSize: 22,
        paddingBottom: 5,
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