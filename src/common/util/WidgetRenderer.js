import React from 'react';
import * as widgets from '../../widgets';

// TODO: Prevent API calls and use previous data when modifying

const WidgetRenderer = ({ w, mods = null }) => {
    let { key, id, meta, content } = w;
    const widgetList = Object.values(widgets);
    const wInfo = widgetList.find(r => r.type === meta.type);
    let widget = wInfo.el;
    let wProps = { id: key, meta, content }

    if (mods) {
        const _meta = { ...meta };
        _meta.pos = { x: 0, y: 0 };
        _meta.modMode = true;
        _meta.mods = mods ?? {};
        wProps.meta = _meta;
        wProps.id = id;     // Widget structure is a mess cause id/key discrepency
    }

return (widget !== null && widget !== undefined)
    ? React.cloneElement(widget, wProps)
    : (<div></div>);
}

export default WidgetRenderer;