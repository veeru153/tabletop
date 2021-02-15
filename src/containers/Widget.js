import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { db, CONFIG, WIDGETS } from '../util/db';

const Widget = (props) => {
    const { style : userStyle, className : userClass, id, meta } = props;
    const [pos, setPos] = useState({ x:0, y:0 });
    // const [data, setData] = useState({});

    // const getWidgetData = async () => {
    //     let data = await db.collection("tabletop_widgets").doc({ id: id }).get();
    //     setData(data);
    // }
    // useEffect(() => getWidgetData(), []);

    const handleReposition = (rePos) => {
        setPos({ x: rePos.x, y: rePos.y });
        const updatedMeta = {...meta, pos: { x: rePos.x, y: rePos.y }}
        db.collection(WIDGETS).doc(id+"").update({ meta: updatedMeta })
    }

    return (
        <Draggable 
            bounds="body"
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