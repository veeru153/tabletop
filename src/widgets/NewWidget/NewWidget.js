import React from 'react';
import Widget from '../../containers/Widget';

/** Instructions on use:
 * 1. DO NOT USE NewWidget DIRECTLY! Make a copy of NewWidget and edit that.
 * 2. Import your widget in ./index.js and follow the instructions there.
 * 3. Complete the widget component below.
 * 4. Remove all template comments from your WidgetForm before sending PR.
 */


const NewWidget = (props) => {
    const { id, meta, } = props;

    return (
        <Widget
            id={id}
            meta={meta}
            // Additional  Props: className, styles
        >
            {/* Add Widget Content here */}
        </Widget>
    )
}

export default NewWidget;