import React, { useState, useEffect } from 'react';
import * as widgets from '../../widgets';
import { WIDGETS } from './db';

// TODO: Prevent API calls and use previous data when modifying

const WidgetRenderer = ({ w, mods = null }) => {
    const [widget, setWidget] = useState(null);
    const [wProps, setWProps] = useState(null);

    useEffect(() => {
        async function getWidget() {
            const W = await WIDGETS.getItem(w);
            let { key, meta, content } = W;
            const widgetList = Object.values(widgets);
            const wInfo = widgetList.find(r => r.type === meta.type);

            if(mods) {
                meta.pos = { x: 0, y: 0 };
                meta.modMode = true;
                meta.mods = mods ?? {};
            }

            setWProps({ id: key, meta, content });
            setWidget(wInfo.el);
        }
        getWidget();
    }, [mods])

    return (widget !== null && widget !== undefined) 
        ? React.cloneElement(widget, wProps)
        : (<div></div>);
}

export default WidgetRenderer;