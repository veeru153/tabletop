import React from 'react';
import * as widgets from '../../widgets';
import * as introWidgets from '../../introWidgets';

const WidgetRenderer = ({ w }) => {
    const { key, meta, content } = w;
    const widgetList = [ ...Object.values(widgets), ...Object.values(introWidgets) ];
    let wInfo = widgetList.find(r => r.type === meta.type);
    const widget = wInfo.el;
    const wProps = { id: key, meta, content }

    return widget !== undefined ? React.cloneElement(widget, wProps) : (<div></div>);
}

export default WidgetRenderer;