import { useState, useEffect, useRef } from 'react';
import classes from './Background.module.scss';
import { CONFIG } from '../../../../../common/util/db';
import { TextInput, Dropdown, Radio } from '../../../../../common/ui';
import { PlusCircle, MinusCircle } from "lucide-react";

const ImagePicker = (props: ImagePickerProps) => {
    const [section, setSection] = useState(-1);      // Local = 0, Online = 1
    const [localImg, setLocalImg] = useState(props.values.image);
    const [sources, setSources] = useState([]);
    const [currSrc, setCurrSrc] = useState("");


    useEffect(() => {
        async function onMount() {
            const imgSrcs = await CONFIG.getItem('imageSrcs');
            if (imgSrcs) {
                if (imgSrcs[0].length > 0) setSection(1);
                setSources(imgSrcs[0]);
            }
        }
        onMount();
    }, [])

    useEffect(() => {
        props.setFieldValue('image', localImg);
    }, [localImg])

    useEffect(() => {
        CONFIG.setItem('imageSrcs', { 0: sources });
    }, [sources]);

    const addSrc = () => {
        if (currSrc.length === 0 || sources.includes(currSrc.trim())) return;
        setSources([...sources, currSrc.trim()]);
        setCurrSrc("");
    }

    const deleteSrc = (idx: number) => {
        const tempSrcs = [...sources];
        tempSrcs.splice(idx, 1);
        setSources(tempSrcs);
    }

    const dropHandler = (e: { preventDefault: () => void; dataTransfer: { files: any[]; }; }) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const fr = new FileReader();
        fr.onload = () => {
            setLocalImg(fr.result.replace(/(\r\n|\n|\r)/gm, ""))
        };
        fr.readAsDataURL(file);
    }

    const updateBlend = async (props: { values: { blend: any; }; setFieldValue: (arg0: string, arg1: any) => void; }, type: string, val: string) => {
        const tempBlend = props.values.blend;
        if (type === 'mode') tempBlend.mode = val;
        if (type === 'color') tempBlend.color = val;
        props.setFieldValue('blend', tempBlend);
    }

    const onlineImagesProps = { sources, currSrc, setCurrSrc, addSrc, deleteSrc };

    return (
        <div>
            <div className={classes.styleSelection}>
                <h3>Source: </h3>
                <div>
                    <Radio
                        label="Local"
                        name="local"
                        value={0}
                        checked={section === 0}
                        onChange={() => setSection(0)}
                        style={styles.radioBtn}
                    />
                </div>
                <div>
                    <Radio
                        label="Online"
                        name="online"
                        value={1}
                        checked={section === 1}
                        onChange={() => setSection(1)}
                        style={styles.radioBtn}
                    />
                </div>
            </div>
            {section === 0 ? <LocalImagePicker selectedImg={localImg} dropHandler={dropHandler} /> : <OnlineImageSection {...onlineImagesProps} />}
            <div>
                <h3>Background Blend: </h3>
                <div className={classes.fields}>
                    <Dropdown
                        name="filterFn"
                        onChange={(e: { target: { value: any; }; }) => updateBlend(props, "mode", e.target.value)}
                        style={{ textTransform: 'capitalize' }}
                        value={props.values.blend.mode}
                        options={blendModeList}
                    />
                    <TextInput
                        name="value"
                        placeholder="Color (Name, HEX, RGBA)"
                        onChange={(e) => updateBlend(props, "color", e.target.value)}
                        value={props.values.blend.color}
                        disabled={props.values.blend.mode === "normal"}
                        style={styles.textInput}
                    />
                </div>
            </div>
        </div>
    )
}

const LocalImagePicker = (props: { selectedImg: any; dropHandler: any; }) => {
    const { selectedImg, dropHandler } = props;
    const preview = useRef();

    useEffect(() => {
        preview.current.src = selectedImg;
    }, [selectedImg]);

    return (
        <React.Fragment>
            <p>Only displayed when Online images can't be displayed or there are no sources in the Online collection. Falls back to Color.</p>
            <div className={classes.imagePickerDropzone} onDrop={(e) => dropHandler(e)} onDragOver={(e) => e.preventDefault()}>
                <img
                    alt="Preview"
                    ref={preview}
                    style={{ display: selectedImg ? 'block' : 'none' }}
                ></img>
                <p style={{ display: selectedImg ? 'none' : 'block' }}>Drag an Image in this Dropzone</p>
            </div>
        </React.Fragment>
    )
}

const OnlineImageSection = ({ sources, currSrc, setCurrSrc, addSrc, deleteSrc, }) => {
    return (
        <div className={classes.imagePicker}>
            <span style={{ fontSize: 16 }}>Falls back to Local Image</span>
            <div className={classes.inputArea}>
                <TextInput
                    name="value"
                    placeholder="Image URL"
                    value={currSrc}
                    onChange={(e) => setCurrSrc(e.target.value)}
                    style={styles.textInput}
                />
                <PlusCircle size={36} onClick={addSrc} />
            </div>
            <div className={classes.sourceList}>
                {sources.map((s: any, i: React.Key | null | undefined) => <ImageSrc key={i} idx={i} src={s} deleteSrc={deleteSrc} />)}
            </div>
        </div>
    )
}

const ImageSrc = ({ idx, src, deleteSrc }) => {
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

const blendModeList = [
    { label: "normal", value: "normal" },
    { label: "multiply", value: "multiply" },
    { label: "overlay", value: "overlay" },
    { label: "screen", value: "screen" },
    { label: "darken", value: "darken" },
    { label: "lighten", value: "lighten" },
    { label: "color-dodge", value: "color-dodge" },
    { label: "color-burn", value: "color-burn" },
    { label: "hard-light", value: "hard-light" },
    { label: "soft-light", value: "soft-light" },
    { label: "difference", value: "difference" },
    { label: "exclusion", value: "exclusion" },
    { label: "hue", value: "hue" },
    { label: "saturation", value: "saturation" },
    { label: "color", value: "color" },
    { label: "luminosity", value: "luminosity" },
]

interface ImagePickerProps {
    values: {
        image: string; 
        blend: { 
            mode: string; 
            color: string; 
        };
    }; 
    setFieldValue: (arg0: string, arg1: any) => void;
}

export default ImagePicker;