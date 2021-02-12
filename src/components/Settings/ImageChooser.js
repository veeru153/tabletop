import React, { useState } from 'react';
import styles from './Settings.module.css';
import MyInput from '../UI/MyInput';

const ImageChooser = (props) => {
    const [imgUrl, setImgUrl] = useState('');
    const getBase64Image = (img) => {
        if (img == '' || !/\.(jpe?g|png)$/i.test(img)) return '';
        let dataURL;
        let myImg = new Image();
        myImg.src = img;
        myImg.onload = () => {
            let canvas = document.createElement("canvas");
            canvas.width = myImg.width;
            canvas.height = myImg.height;

            let ctx = canvas.getContext("2d");
            ctx.drawImage(myImg, 0, 0);

            dataURL = canvas.toDataURL("image/png");
        }
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Image URL</h3>
            <MyInput
                label="URL"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                onBlur={(e) => props.setFieldValue('bgContent', getBase64Image(e.target.value))}
                config={{ required: true }}
            />
            <div>(Pasting Image URLs will convert them to DataURLs)</div>
        </div>
    )
}

const dummy = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Image URL</h3>
            <div>Stay Tuned</div>
        </div>
    )
}

export default dummy;