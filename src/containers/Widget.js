import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import db from '../util/db';

const Widget = (props) => {
    const { style : userStyle, className : userClass } = props;
    // const [data, setData] = useState({});

    // const getWidgetData = async () => {
    //     let data = await db.collection("tabletop_widgets").doc({ id: id }).get();
    //     setData(data);
    // }
    // useEffect(() => getWidgetData(), []);

    return (
        <Draggable bounds="body">
            <div className={userClass} style={userStyle}>
                {props.children}
            </div>
        </Draggable>
    )
}

export default Widget;