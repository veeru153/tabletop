import React from 'react';
import classes from './Background.module.scss';

const Images = () => {
    const { innerWidth: w, innerHeight: h} = window;

    const urls = [
        getPicsumLink(w, h, 100),
        getPicsumLink(w, h, 200),
        getPicsumLink(w, h, 300),
        getPicsumLink(w, h, 400),
    ]

    const i = Math.floor(Math.random() * urls.length);
    return (
        <img src={urls[i]} alt="Background" className={classes.Images} />
    )
}

const getPicsumLink = (w, h, seed) => {
    return `https://picsum.photos/${seed && `seed/${seed}/`}${w}/${h}`
}

export default Images;