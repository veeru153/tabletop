import React from 'react';
import * as wReg from '../util/widgetRegistry';

const WidgetRenderer = ({ id, data }) => {
    const { meta } = data;
    const registry = Object.entries(wReg);
    const wInfo = registry.find(r => r[1].type === meta.type);
    const widget = wInfo[1].el;

    return widget !== undefined ? React.cloneElement(widget, { id: id, meta: meta }) : (<div></div>);
}

export default WidgetRenderer;