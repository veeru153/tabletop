import React, { useState, useEffect } from 'react';
import classes from './Background.module.scss';

const Images = ({ blend, local }) => {
    const [src, setSrc] = useState(BASE_IMG);

    useEffect(() => {
        async function onMount() {
            if(navigator.onLine) {
                const { width, height } = window.screen;
                const url = `https://picsum.photos/${width}/${height}`;
                setSrc(url);
            } else {
                setSrc(local);
            }
        }
        onMount();
    }, [])

    return (
        <div 
            className={classes.Images}
            style={{ 
                backgroundImage: `url(${src})`,
                backgroundBlendMode: blend.mode ?? "normal",
                backgroundColor: blend.color ?? "rgba(0,0,0,0)",
            }}
        ></div>
    )
}

const BASE_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=";

export default Images;