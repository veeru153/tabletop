import React, { useState, useEffect } from 'react';
import { db, CONFIG } from '../../common/util/db';
import classes from './Background.module.scss';

const Images = () => {
    // const { innerWidth: w, innerHeight: h} = window;

    // const urls = [
    //     getPicsumLink(w, h, 100),
    //     getPicsumLink(w, h, 200),
    //     getPicsumLink(w, h, 300),
    //     getPicsumLink(w, h, 400),
    // ]

    const [src, setSrc] = useState("");

    useEffect(() => {
        async function onMount() {
            const urls = await db.collection(CONFIG).doc('imageSrcs').get();
            const i = Math.floor(Math.random() * urls[0].length);
            console.log(urls[0][i]);
            setSrc(urls[0][i]);
        }
        onMount();
    }, [])

    return (
        // <img src={urls[i]} alt="Background" className={classes.Images} />
        <div 
            className={classes.Images}
            style={{ backgroundImage: `url(${src})` }}
        ></div>
    )
}

const getPicsumLink = (w, h, seed) => {
    return `https://picsum.photos/${seed && `seed/${seed}/`}${w}/${h}`
}

export default Images;