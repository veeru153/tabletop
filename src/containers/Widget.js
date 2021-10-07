import React, { useState, useContext } from 'react';
import Draggable from 'react-draggable';
import { ConfigContext } from '../common/util/contexts';
import { X } from 'react-feather';
import classes from './Widget.module.scss';

const Widget = (props) => {
    const { id, meta, style: userStyle, className: userClass, } = props;
    const [pos, setPos] = useState(meta.pos);
    const [grabbed, setGrabbed] = useState(false);

    const { editMode, removeWidget, meta : appMeta } = useContext(ConfigContext);

    const handleReposition = async (rePos) => {
        setPos({ x: rePos.x, y: rePos.y });
    }


    const styles = {
        cursor: editMode ? (grabbed ? 'grabbing' : 'grab') : 'default',
        ...userStyle,
    }

    const editWidgetProps = { id, removeWidget };

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

const EditWidget = ({ id, removeWidget }) => {
    return (
        <div className={classes.EditWidget}>
            <X
                className={classes.closeBtn}
                onClick={() => removeWidget(id)}
            />
        </div>
    )
}

export default Widget;