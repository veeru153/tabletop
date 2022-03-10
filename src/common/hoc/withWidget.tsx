import React, { useState, useContext } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { X } from 'lucide-react';
import classes from './Widget.module.scss';
import { useSetRecoilState } from 'recoil';
import { widgetSelector } from '../atoms/widgets';
import { WidgetInfo } from '../util/types';

const withWidget = (Widget) => {
    return (props: WidgetInfo) => {
        const { id, meta } = props;
        const setWidget = useSetRecoilState(widgetSelector(id));
        const [pos, setPos] = useState(meta.pos);
        const [grabbed, setGrabbed] = useState(false);
        const [userClasses, setUserClasses] = useState('');
        const [userStyle, setUserStyle] = useState({});

        const editMode = true;

        // const { editMode, meta: appMeta } = useContext(ConfigContext);

        const handleReposition = async (rePos: DraggableData) => {
            setPos({ x: rePos.x, y: rePos.y });
            const updatedMeta = { ...meta, pos: { x: rePos.x, y: rePos.y } }
            setWidget({ ...props, meta: updatedMeta });
        }

        const removeWidget = () => {
            setWidget(null);
        }

        const useClassName = (classNames : string) => { setUserClasses(classNames); }
        const useStyle = (styles : React.CSSProperties) => { setUserStyle(styles); }

        const styles = {
            cursor: editMode ? (grabbed ? 'grabbing' : 'grab') : 'default',
            ...userStyle,
        }

        const editWidgetProps = { removeWidget };
        const widgetProps = { ...props, useClassName, useStyle };


        return (
            <Draggable
                // bounds="body"
                position={pos}
                onMouseDown={() => editMode && setGrabbed(true)}
                onDrag={(e, rePos) => handleReposition(rePos)}
                onStop={() => setGrabbed(false)}
                // disabled={!(editMode || appMeta.allowWidgetReposWithoutEdit)}
            >
                <div
                    className={userClasses}
                    style={styles}
                >
                    <Widget {...widgetProps} />
                    {editMode && <EditWidget {...editWidgetProps} />}

                </div>
            </Draggable>
        )
    }
}

const EditWidget = ({ removeWidget }: { removeWidget: Function }) => {
    return (
        <div className={classes.EditWidget}>
            <X
                className={classes.closeBtn}
                onClick={() => removeWidget()}
            />
        </div>
    )
}

export default withWidget;