import React, { useState } from 'react';
import { Button } from '../../../common/ui';
import classes from './ModifyWidget.module.scss';
import ModifyRow from './ModifyRow';

const Content = ({ mods, setMods }) => {

    const defaults = {
        background: "rgba(0,0,0,0.56)",
        color: "#dedede",
    }

    const [background, setBackground] = useState(mods.background ?? "");
    const [color, setColor] = useState(mods.color ?? "");

    const updateMods= () => {
        if(background == "") setBackground(defaults.background);
        if(color == "") setColor(defaults.color);

        setMods({ ...mods, background, color, })
    }

    return (
        <div className={classes.menuSection}>
            <ModifyRow label="Background" placeholder={defaults.background} value={background} onChange={setBackground} />
            <ModifyRow label="Color" placeholder={defaults.color} value={color} onChange={setColor} />
            <Button onClick={updateMods}>Update</Button>
        </div>
    )
}

export default Content;