import { useState, useContext } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { WIDGETS } from '../common/util/db';
import { ConfigContext } from '../common/util/contexts';
import { X } from 'lucide-react';
import classes from './Widget.module.scss';
import { WidgetMeta } from '../common/util/types';
import { useSetRecoilState } from 'recoil';
import { widgetSelector } from '../common/atoms/widgets';

const Widget = (props: WidgetProps) => {
    const { id, meta, style: userStyle, className: userClass, } = props;
    const [pos, setPos] = useState(meta.pos);
    const [grabbed, setGrabbed] = useState(false);

    const { editMode, removeWidget, meta: appMeta } = useContext(ConfigContext);

    const handleReposition = async (rePos: DraggableData) => {
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

const EditWidget = ({ id, removeWidget }: { id: string, removeWidget: Function }) => {
    const setWidget = useSetRecoilState(widgetSelector(id));

    const _removeWidget = () => {
        setWidget(null);
    }

    return (
        <div className={classes.EditWidget}>
            <X
                className={classes.closeBtn}
                onClick={() => _removeWidget()}
            />
        </div>
    )
}

interface WidgetProps {
    id: string;
    meta: WidgetMeta;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default Widget;