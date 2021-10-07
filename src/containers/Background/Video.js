import React, { useState, useEffect } from 'react';
import classes from './Background.module.scss';

const Video = () => {
    const [src, setSrc] = useState("");

    useEffect(() => {
        async function onMount() {
            const i = Math.floor(Math.random() * urls[0].length);
            setSrc(urls[0][i]);
        }
        onMount();
    }, [])

    return (
        <video src={src} className={classes.Video} autoPlay loop muted controls={false} />
    )
}

export default Video;