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

    return (
        <div style={imgPickerStyle.dropZone} onDrop={(e) => dropHandler(e)} onDragOver={(e) => e.preventDefault()}>
            <img alt="Preview" ref={preview} style={{...imgPickerStyle.img, opacity: selectedImg ? 1 : 0}}></img>
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

export default ImagePicker;