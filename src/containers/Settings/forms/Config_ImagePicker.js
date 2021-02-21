import React, { useState, useEffect, useRef } from 'react';

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

    const updateBlend = async (props, type, val) => {
        const tempBlend = props.values.blend;
        if (type === 'mode') tempBlend.mode = val;
        if (type === 'color') tempBlend.color = val;
        props.setFieldValue('blend', tempBlend);
    }

    return (
        <div>
            <div style={imgPickerStyle.dropZone} onDrop={(e) => dropHandler(e)} onDragOver={(e) => e.preventDefault()}>
                <img alt="Preview" ref={preview} style={{ ...imgPickerStyle.img, opacity: selectedImg ? 1 : 0 }}></img>
                <p>Drag one or more files to this Drop Zone ...</p>
            </div>
            <div>

                <h3>Background Blend: </h3>
                <select
                    name="filterFn"
                    id="filterFn"
                    onChange={(e) => updateBlend(props, "mode", e.target.value)}
                    style={{ textTransform: 'capitalize' }}
                    value={props.values.blend.mode}
                >
                    {blendModeList.map(mode => <option key={mode} value={mode}>{mode}</option>)}
                </select>
                <input
                    name="value"
                    type="text"
                    placeholder="Value"
                    onChange={(e) => updateBlend(props, "color", e.target.value)}
                    value={props.values.blend.color}
                    disabled={props.values.blend.mode === "normal"}
                />
            </div>
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