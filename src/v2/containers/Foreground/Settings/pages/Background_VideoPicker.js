import React, { useState, useEffect, useRef } from 'react';
import classes from './Background.module.scss';
import { db, CONFIG } from '../../../../common/util/db';
import { TextInput, Dropdown, Radio, Button } from '../../../../common/ui';
import { PlusCircle, MinusCircle } from "react-feather"

const VideoPicker = (props) => {
    const [sources, setSources] = useState([]);
    const [currSrc, setCurrSrc] = useState("");

    useEffect(() => {
        async function onMount() {
            const videoSrcs = await db.collection(CONFIG).doc('videoSrcs').get();
            setSources(videoSrcs[0]);
        }
        onMount();
    }, [])

    useEffect(() => {
        db.collection(CONFIG).doc('videoSrcs').set({ 0: sources });
    }, [sources]);

    const addSrc = () => {
        if(currSrc.length == 0 || sources.includes(currSrc.trim())) return;
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
            <span>Falls back to Local Image</span>
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

const VideoSrc = ({ idx, src, deleteSrc }) => {
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