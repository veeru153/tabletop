import React, { useState, useContext } from 'react';
import { Button, Accordion, Checkbox } from '../../../../../common/ui';
import { ConfigContext } from '../../../../../common/util/contexts';

const General = () => {
    const { clearWidgets, hideZeroWidgetMsg, allowWidgetReposWithoutEdit, meta } = useContext(ConfigContext);
    const [clearConfirm, setClearConfirm] = useState(false);

    const handleZeroWidgetMsg = () => {
        if(meta.showZeroWidgetMsg) hideZeroWidgetMsg();
        else hideZeroWidgetMsg(false);
    }

    const handleWidgetRepos = () => {
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
                <Checkbox
                    checked={meta.showZeroWidgetMsg}
                    onClick={handleZeroWidgetMsg}
                >Show Zero Widget message</Checkbox>
                <Checkbox
                    checked={meta.allowWidgetReposWithoutEdit}
                    onClick={handleWidgetRepos}
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