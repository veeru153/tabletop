import React from 'react';
import * as widgets from '../../widgets';

const WidgetRenderer = ({ w }) => {
    const { id, meta, content } = w;
    const widgetList = Object.values(widgets);
    const wInfo = widgetList.find(r => r.type === meta.type);
    const widget = wInfo && wInfo.el;
    const wProps = { key: id, id, meta, content }

    return widget !== undefined ? React.cloneElement(widget, wProps) : (<div></div>);
}

export default WidgetRenderer;