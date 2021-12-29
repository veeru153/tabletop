import React, { useState } from 'react';
import { Button } from '../../../common/ui';
import classes from './ModifyWidget.module.scss';
import ModifyRow from './ModifyRow';

const Structure = ({ mods, setMods }) => {

    const defaults = {
        borderStyle: "none",
        borderWidth: "0px",
        borderColor: "transparent",
        borderRadius: "0px",
    }

    const [borderStyle, setBorderStyle] = useState(mods.borderStyle ?? "");
    const [borderWidth, setBorderWidth] = useState(mods.borderWidth ?? "");
    const [borderColor, setBorderColor] = useState(mods.borderColor ?? "");
    const [borderRadius, setBorderRadius] = useState(mods.borderRadius ?? "");

    const updateMods = () => {
        if (borderStyle == "") setBorderStyle(defaults.borderStyle);
        if (borderWidth == "") setBorderWidth(defaults.borderWidth);
        if (borderColor == "") setBorderColor(defaults.borderColor);
        if (borderRadius == "") setBorderRadius(defaults.borderRadius);

        setMods({ ...mods, borderStyle, borderWidth, borderColor, borderRadius })
    }

    return (
        <div className={classes.menuSection}>
            <h2 style={{ marginTop: 0 }}>Borders</h2>
            <ModifyRow label="Style" placeholder={defaults.borderStyle} value={borderStyle} onChange={setBorderStyle} />
            <ModifyRow label="Width" placeholder={defaults.borderWidth} value={borderWidth} onChange={setBorderWidth} />
            <ModifyRow label="Color" placeholder={defaults.borderColor} value={borderColor} onChange={setBorderColor} />
            <ModifyRow label="Radius" placeholder={defaults.borderRadius} value={borderRadius} onChange={setBorderRadius} />

            <Button onClick={updateMods}>Update</Button>
        </div>
    )
}

export default Structure;