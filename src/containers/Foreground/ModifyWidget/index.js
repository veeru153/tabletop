import React, { useState, useEffect } from 'react';
import classes from './ModifyWidget.module.scss';
import PageShell from '../PageShell';
import { Page, Button } from '../../../common/ui'
import WidgetRenderer from '../../../common/util/WidgetRenderer';
import { WIDGETS } from '../../../common/util/db';
import Colors from './Colors';
import cuid from 'cuid';


const ModifyWidget = ({ modifyWidget : w, setModifyWidget }) => {
    const [mods, setMods] = useState(w.meta.mods ?? {});
    const [menu, setMenu] = useState(null);
    // const [w2, setW2] = useState({});
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

    // useEffect(() => {
    //     console.log(w);
    //     setMods(w.meta.mods ?? {});
    // }, [w])

    return (
        <PageShell
            visibility={w}
            setVisibility={setModifyWidget}
            onClose={() => setModifyWidget(null)}
        >
            <Page
                title="Modify Widget"
                subtitle="Tweak your Widget here:"
            >
                <div className={classes.main}>
                    <WidgetRenderer w={w} mods={mods} />
                    <div className={classes.menus}>
                        <Button onClick={() => setMenu(1)}>Colors</Button>
                        <Button onClick={() => setMenu(2)}>Borders</Button>
                        <Button onClick={() => setMenu(3)}>Sizing</Button>
                        <Button onClick={() => setMenu(4)}>Advanced</Button>
                        <Button onClick={() => {
                            console.log("the updateCounter", updateCounter);
                            setUpdateCounter(updateCounter + 1)
                        }}>Update</Button>
                    </div>
                </div>
                <div className={classes.menuOpts}>
                    <Colors mods={mods} setMods={setMods} />
                </div>
            </Page>
        </PageShell>
    )
}

export default ModifyWidget;