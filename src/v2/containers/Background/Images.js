import React, { useState, useEffect } from 'react';
import { CONFIG } from '../../common/util/db';
import classes from './Background.module.scss';

const Images = () => {
    const [src, setSrc] = useState("");

    useEffect(() => {
        async function onMount() {
            const urls = await CONFIG.getItem('imageSrcs');
            const i = Math.floor(Math.random() * urls[0].length);
            setSrc(urls[0][i]);
        }
        onMount();
    }, [])

    return (
        <div 
            className={classes.Images}
            style={{ backgroundImage: `url(${src})` }}
        ></div>
    )
}

export default Images;