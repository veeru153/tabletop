import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { imageSrcsSelector } from '../../common/atoms/config';
import classes from './Background.module.scss';

const Images = ({ blend, local } : { blend: any, local: any }) => {
    const [src, setSrc] = useState(BASE_IMG);
    const urls = useRecoilValue(imageSrcsSelector);

    useEffect(() => {
        async function onMount() {
            if(navigator.onLine) {
                const tmp = [...urls];
                if(local.length > 0) tmp.push(local);
                const i = Math.floor(Math.random() * tmp.length);
                setSrc(tmp[i]);
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