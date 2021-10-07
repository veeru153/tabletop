import React, { useState } from 'react';
import classes from './Background.module.scss';
import { TextInput, Dropdown, Radio } from '../../../../../common/ui';

const ImagePicker = (props) => {
    const [section, setSection] = useState(1);      // Local = 0, Online = 1

    const updateBlend = async (props, type, val) => {
        const tempBlend = props.values.blend;
        if (type === 'mode') tempBlend.mode = val;
        if (type === 'color') tempBlend.color = val;
        props.setFieldValue('blend', tempBlend);
    }

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
            {section === 0 ? <LocalImagePicker /> : <OnlineImageSection />}
            <div>
                <h3>Background Blend: </h3>
                <div className={classes.fields}>
                    <Dropdown
                        name="filterFn"
                        onChange={(e) => updateBlend(props, "mode", e.target.value)}
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

const LocalImagePicker = () => {
    return (
        <React.Fragment>
            <p>Local images only available in extension.</p>
        </React.Fragment>
    )
}

const OnlineImageSection = () => {
    return (
        <div className={classes.imagePicker}>
            <span style={{ fontSize: 16 }}>Sets a random image on the website (Images sourced from <a style={styles.link} href="https://picsum.photos/">Lorem Picsum</a>). Custom links only available in extension.</span>
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
    link: {
        color: "#dedede",
        textDecoration: "underline",
    }
}

const blendModeList = [
    "normal",
    "multiply",
    "overlay",
    "screen",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
]

export default ImagePicker;