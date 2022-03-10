import { WidgetProps } from '../../common/util/types';
// ^^^^^ Required Imports ^^^^^
// Add imports below

/** Instructions on use:
 * 1. DO NOT USE NewWidget DIRECTLY! Make a copy of NewWidget and edit that.
 * 2. Rename this file to <WIDGET_NAME>W.js and the component to <WIDGET_NAME>.
 * 3. Complete the widget component below.
 * 4. Import your widget in accompanying ./index.js and follow the instructions there.
 * 5. Remove all template comments from NewWidget before sending PR.
 */


const NewWidget = ({ content } : WidgetProps) => {
    const { params, data } = content;
    
    return (
        <div>
            {/* Add Widget Content here */}
        </div>
    )
}

export default NewWidget;