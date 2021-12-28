import React, { useState } from 'react';
import { TextInput, Button } from '../../../common/ui';

const Colors = ({ mods, setMods }) => {
    const [backgroundColor, setBackgroundColor] = useState(mods.backgroundColor ?? "");
    const [color, setColor] = useState(mods.color ?? "");

    const updateColors = () => {
        setMods({
            ...mods,
            backgroundColor,
            color,
        })
    }

    return (
        <div>
            <div>
                <h3>Background</h3>
                <TextInput 
                    placeholder="rgba(0,0,0,0.56)"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                />
            </div>
            <div>
                <h3>Content</h3>
                <TextInput 
                    placeholder="#dedede"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>
            <Button onClick={updateColors}>Update</Button>
        </div>
    )
}

export default Colors;