import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { db, WIDGETS } from '../common/util/db';

const Widget = (props) => {
    const { id, meta, style : userStyle, className : userClass, } = props;
    const [pos, setPos] = useState(meta.pos);

    const handleReposition = (rePos) => {
        setPos({ x: rePos.x, y: rePos.y });
        const updatedMeta = {...meta, pos: { x: rePos.x, y: rePos.y }}
        db.collection(WIDGETS).doc(id).update({ meta: updatedMeta })
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