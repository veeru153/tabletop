import React, { useState, useContext } from 'react';
import Draggable from 'react-draggable';
import { WIDGETS } from '../common/util/db';
import { ConfigContext } from '../common/util/contexts';
import { X, Edit } from 'react-feather';
import classes from './Widget.module.scss';

const Widget = (props) => {
    const { id, meta, style: userStyle, className: userClass, } = props;
    const [pos, setPos] = useState(meta.pos);
    const [grabbed, setGrabbed] = useState(false);

    const { editMode, setModifyWidget, removeWidget, meta : appMeta } = useContext(ConfigContext);

    const handleReposition = async (rePos) => {
        setPos({ x: rePos.x, y: rePos.y });
        const updatedMeta = { ...meta, pos: { x: rePos.x, y: rePos.y } }
        const wData = await WIDGETS.getItem(id);
        wData.meta = updatedMeta;
        await WIDGETS.setItem(id, wData);
    }


    const styles = {
        cursor: editMode ? (grabbed ? 'grabbing' : 'grab') : 'default',
        ...userStyle,
    }

    const editWidgetProps = { id, removeWidget, setModifyWidget };

    return (
        <Draggable
            // bounds="body"
            position={pos}
            onMouseDown={() => editMode && setGrabbed(true)}
            onDrag={(e, rePos) => handleReposition(rePos)}
            onStop={() => setGrabbed(false)}
            disabled={!(editMode || appMeta.allowWidgetReposWithoutEdit)}
        >
            <div 
                className={userClass} 
                style={styles}
            >
                {editMode && <EditWidget {...editWidgetProps} />}
                {props.children}
            </div>
        </Draggable>
    )
}

const EditWidget = ({ id, removeWidget, setModifyWidget }) => {
    return (
        <div className={classes.EditWidget}>
            <X onClick={() => removeWidget(id)} />
            <Edit onClick={() => setModifyWidget(id)} />
        </div>
    )
}

export default Widget;