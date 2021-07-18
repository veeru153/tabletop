import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { WIDGETS } from '../common/util/db';

const Widget = (props) => {
    const { id, meta, style : userStyle, className : userClass, } = props;
    const [pos, setPos] = useState(meta.pos);

    const handleReposition = async (rePos) => {
        setPos({ x: rePos.x, y: rePos.y });
        const updatedMeta = {...meta, pos: { x: rePos.x, y: rePos.y }}
        const wData = await WIDGETS.getItem(id);
        wData.meta = updatedMeta;
        await WIDGETS.setItem(id, wData);
    }

    return (
        <Draggable 
            // bounds="body"
            position={pos}
            onStop={(e, rePos) => handleReposition(rePos)}
        >
            <div className={userClass} style={userStyle}>
                {props.children}
            </div>
        </Draggable>
    )
}

export default Widget;