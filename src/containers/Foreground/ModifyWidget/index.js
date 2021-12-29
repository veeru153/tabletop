import React, { useState, useEffect, useRef } from 'react';
import classes from './ModifyWidget.module.scss';
import PageShell from '../PageShell';
import { Page, Button } from '../../../common/ui'
import WidgetRenderer from '../../../common/util/WidgetRenderer';
import Colors from './Colors';
import Baka from './Baka';


const ModifyWidget = ({ modifyWidget: w, setModifyWidget }) => {
    const [mods, setMods] = useState(w.meta.mods ?? {});
    const [menu, setMenu] = useState(null);
    const [updateCounter, setUpdateCounter] = useState(0);

    // useEffect(() => {
    //     console.log("Running", updateCounter);
    //     async function getMods() {
    //         const w = await WIDGETS.getItem(modifyWidget);
    //         console.log("WIDGETS.getItem() finished");
    //         console.log(w);
    //         setW2(w);
    //         console.log('onmnt', w2);
    //         setMods(w.meta.mods ?? {});
    //     }
    //     getMods();
    // }, [updateCounter])

    useEffect(() => {
        console.log("mods was updated");
        setUpdateCounter(updateCounter + 1)
    }, [mods])

    const updateMods = (newMods) => {
        setMods(newMods);
    }

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
            >
                <div className={classes.main}>
                    <WidgetRenderer key={updateCounter} w={w} mods={mods} />
                    <div className={classes.menus}>
                        <Button onClick={() => setMenu(1)}>Colors</Button>
                        <Button onClick={() => setMenu(2)}>Borders</Button>
                        <Button onClick={() => setMenu(3)}>Sizing</Button>
                        <Button onClick={() => setMenu(4)}>Advanced</Button>
                    </div>
                </div>
                <div className={classes.menuOpts}>
                    <Colors mods={mods} setMods={setMods} updateMods={updateMods} />
                </div>
            </Page>
        </PageShell>
        
    )
}

export default ModifyWidget;