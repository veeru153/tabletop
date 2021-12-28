import React, { useState, useContext } from 'react';
import Draggable from 'react-draggable';
import { WIDGETS } from '../common/util/db';
import { ConfigContext } from '../common/util/contexts';
import { X, Edit } from 'react-feather';
import classes from './Widget.module.scss';

const Widget = (props) => {
    const { id, meta, content, style: userStyle, className: userClass, } = props;
    const [pos, setPos] = useState(meta.pos);
    const [grabbed, setGrabbed] = useState(false);

    const { editMode, modifyWidget, setModifyWidget, removeWidget, meta: appMeta } = useContext(ConfigContext);

    const handleReposition = async (rePos) => {
        setPos({ x: rePos.x, y: rePos.y });
        const updatedMeta = { ...meta, pos: { x: rePos.x, y: rePos.y } }
        const wData = await WIDGETS.getItem(id);
        wData.meta = updatedMeta;
        await WIDGETS.setItem(id, wData);
    }

    const handleModification = () => {
        setModifyWidget({ id, meta, content });
    }

    const styles = {
        cursor: (editMode && !modifyWidget) ? (grabbed ? 'grabbing' : 'grab') : 'default',
        ...userStyle,
    }

    const editWidgetProps = { id, removeWidget, handleModification };


    if (meta.modMode) {
        return (
            <div
                className={userClass}
                style={{ ...styles, position: "relative", ...meta.mods }}
            >
                {(editMode && !modifyWidget) && <EditWidget {...editWidgetProps} />}
                {props.children}
            </div>
        )
    }

    return (
        <Draggable
            // bounds="body"
            position={pos}
            onMouseDown={() => editMode && setGrabbed(true)}
            onDrag={(e, rePos) => handleReposition(rePos)}
            onStop={() => setGrabbed(false)}
            disabled={!(editMode || appMeta.allowWidgetReposWithoutEdit) || (modifyWidget && true)}
        >
            <div
                className={userClass}
                style={styles}
            >
                {(editMode && !modifyWidget) && <EditWidget {...editWidgetProps} />}
                {props.children}
            </div>
        </Draggable>
    )
}

const EditWidget = ({ id, removeWidget, handleModification }) => {
    return (
        <div className={classes.EditWidget}>
            <X onClick={() => removeWidget(id)} />
            <Edit onClick={() => handleModification()} />
        </div>
    )
}

export default Widget;