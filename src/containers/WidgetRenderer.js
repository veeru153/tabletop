import React from 'react';
import * as widgets from '../widgets';

const WidgetRenderer = ({ id, data }) => {
    const { meta } = data;
    const widgetList = Object.entries(widgets);
    const wInfo = widgetList.find(r => r[1].type === meta.type);
    const widget = wInfo[1].el;

    return widget !== undefined ? React.cloneElement(widget, { id: id, meta: meta }) : (<div></div>);
}

export default WidgetRenderer;