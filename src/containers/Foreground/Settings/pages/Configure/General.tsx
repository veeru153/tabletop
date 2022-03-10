import { useState, useContext } from 'react';
import { Button, Accordion, Checkbox } from '../../../../../common/ui';
import { ConfigContext } from '../../../../../common/util/contexts';
import { useResetRecoilState } from 'recoil';
import { widgetsAtom } from '../../../../../common/atoms/widgets';

const General = () => {
    const { hideZeroWidgetMsg, allowWidgetReposWithoutEdit, showCoverOnStart, meta } = useContext(ConfigContext);
    const [clearConfirm, setClearConfirm] = useState(false);
    const clearWidgets = useResetRecoilState(widgetsAtom);

    // const handleShowCoverOnStart = () => {
    //     if(meta.showCoverOnStart) showCoverOnStart(false);
    //     else showCoverOnStart();
    // }

    const handleZeroWidgetMsg = () => {
        if(meta.showZeroWidgetMsg) hideZeroWidgetMsg();
        else hideZeroWidgetMsg(false);
    }

    const handleWidgetReposition = () => {
        allowWidgetReposWithoutEdit(!meta.allowWidgetReposWithoutEdit);
    }

    const handleClearWidgets = () => {
        if(!clearConfirm) {
            setClearConfirm(true);
            setTimeout(() => setClearConfirm(false), 5000);
            return;
        }

        clearWidgets();
        setClearConfirm(false);
    }

    return (
            <Accordion title="General">
                {/* <Checkbox
                    checked={meta.showCoverOnStart}
                    onClick={handleShowCoverOnStart}
                >Show Cover on Start</Checkbox> */}
                <Checkbox
                    checked={meta.showZeroWidgetMsg}
                    onClick={handleZeroWidgetMsg}
                >Show Zero Widget message</Checkbox>
                <Checkbox
                    checked={meta.allowWidgetReposWithoutEdit}
                    onClick={handleWidgetReposition}
                >Allow widget repositioning outside of Edit Mode</Checkbox>
                <div style={styles.row}>
                    <Button 
                        onClick={handleClearWidgets} 
                        style={{ 
                            margin: 0,
                            backgroundColor: clearConfirm ? "tomato" : "",
                            color: clearConfirm ? "black" : "",
                        }}
                    >Clear All Widgets</Button>
                    <h4 style={{ display: clearConfirm ? "block" : "none", margin: 0 }}>Are you sure? Click again to Confirm.</h4>
                </div>
            </Accordion>
    )
}

const styles = {
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 24,
    }
}

export default General;