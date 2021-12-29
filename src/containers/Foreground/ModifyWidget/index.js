import React, { useState, useEffect, useRef } from 'react';
import classes from './ModifyWidget.module.scss';
import PageShell from '../PageShell';
import { Page, Button } from '../../../common/ui'
import WidgetRenderer from '../../../common/util/WidgetRenderer';
import Content from './Content';
import Appearance from './Appearance';
import Structure from './Structure';
import Advanced from './Advanced';


const ModifyWidget = ({ modifyWidget: w, setModifyWidget }) => {
    const [mods, setMods] = useState(w.meta.mods ?? {});
    const [menu, setMenu] = useState(0);
    const [updateCounter, setUpdateCounter] = useState(0);

    useEffect(() => {
        // Need this to update rerender PageShell
        setUpdateCounter(updateCounter + 1)
    }, [mods, menu])

    return (
        <PageShell
            key={updateCounter}
            visibility={w}
            setVisibility={setModifyWidget}
            onClose={() => setModifyWidget(null)}
        >
            <Page
                key={JSON.stringify(mods)}
                title="Modify Widget"
                subtitle="Tweak your Widget here:"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 36
                }}
            >
                <div className={classes.main}>
                    <WidgetRenderer key={updateCounter} w={w} mods={mods} />
                    <div className={classes.menus}>
                        <Button disabled onClick={() => setMenu(0)}>Content</Button>
                        <Button onClick={() => setMenu(1)}>Appearance</Button>
                        <Button onClick={() => setMenu(2)}>Structure</Button>
                        <Button disabled onClick={() => setMenu(3)}>Advanced</Button>
                    </div>
                </div>
                {([
                    <Content mods={mods} setMods={setMods} />,
                    <Appearance mods={mods} setMods={setMods} />,
                    <Structure mods={mods} setMods={setMods} />,
                    <Advanced mods={mods} setMods={setMods} />,
                ])[menu]}
            </Page>
        </PageShell>
        
    )
}

export default ModifyWidget;