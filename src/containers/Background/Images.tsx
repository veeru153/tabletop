import { useState, useEffect } from 'react';
import { CONFIG } from '../../common/util/db';
import classes from './Background.module.scss';

const Images = ({ blend, local }) => {
    const [src, setSrc] = useState(BASE_IMG);

    useEffect(() => {
        async function onMount() {
            if(navigator.onLine) {
                const urls = await CONFIG.getItem('imageSrcs');
                if(local.length > 0) urls[0].push(local);
                if(urls[0].length > 0) {
                    const i = Math.floor(Math.random() * urls[0].length);
                    setSrc(urls[0][i]);
                }
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