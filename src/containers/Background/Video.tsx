import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { videoSrcsSelector } from '../../common/atoms/config';
import classes from './Background.module.scss';

const Video = () => {
    const [src, setSrc] = useState("");
    const urls = useRecoilValue(videoSrcsSelector);

    useEffect(() => {
        async function onMount() {
            const i = Math.floor(Math.random() * urls.length);
            setSrc(urls[i]);
        }
        onMount();
    }, [])

    return (
        <video src={src} className={classes.Video} autoPlay loop muted controls={false} />
    )
}

export default Video;