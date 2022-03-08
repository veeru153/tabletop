import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { videoSrcsSelector } from '../../../../../common/atoms/config';
import classes from './Background.module.scss';
import { CONFIG } from '../../../../../common/util/db';
import { TextInput } from '../../../../../common/ui';
import { PlusCircle, MinusCircle } from "lucide-react";

const VideoPicker = (props) => {
    const [sources, setSources] = useRecoilState(videoSrcsSelector);
    const [currSrc, setCurrSrc] = useState("");

    useEffect(() => {
        CONFIG.setItem('videoSrcs', { 0: sources });
    }, [sources]);

    const addSrc = () => {
        if (currSrc.length === 0 || sources.includes(currSrc.trim())) return;
        setSources([...sources, currSrc.trim()]);
        setCurrSrc("");
    }

    const deleteSrc = (idx) => {
        const tempSrcs = [...sources];
        tempSrcs.splice(idx, 1);
        setSources(tempSrcs);
    }

    return (
        <div className={classes.videoPicker}>
            <span style={{ fontSize: 16 }}>EXPERIMENTAL: Falls back to Local Image</span>
            <div className={classes.inputArea}>
                <TextInput
                    name="value"
                    placeholder="Video URL"
                    value={currSrc}
                    onChange={(e) => setCurrSrc(e.target.value)}
                    style={styles.textInput}
                />
                <PlusCircle size={36} onClick={addSrc} />
            </div>
            <div className={classes.sourceList}>
                {sources.map((s, i) => <VideoSrc key={i} idx={i} src={s} deleteSrc={deleteSrc} />)}
            </div>
        </div>
    )
}

const VideoSrc = ({ idx, src, deleteSrc }: { idx: number, src: string, deleteSrc: Function }) => {
    return (
        <div className={classes.source}>
            <p>{src}</p>
            <span><MinusCircle size={24} onClick={() => deleteSrc(idx)} /></span>
        </div>
    )
}

const styles = {
    textInput: {
        fontSize: 22,
        paddingBottom: 5,
    },
    radioBtn: {
        fontSize: '18.72px',
    },
}

export default VideoPicker;