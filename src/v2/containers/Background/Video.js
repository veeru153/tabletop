import React from 'react';
import classes from './Background.module.scss';

const Video = () => {
    const { innerWidth: w, innerHeight: h} = window;
    // const id = "LavishSillyGodwit";
    const id = "AcidicHandyCygnet";
    const url = `https://giant.gfycat.com/${id}.mp4`

    return (
        <video src={url} className={classes.Video} autoPlay loop muted controls={false} />
    )
}

export default Video;