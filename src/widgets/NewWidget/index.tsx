import NewWidget from './NewWidgetW';
import NewWidgetForm from './NewWidgetForm';

/** Instructions on use:
 * 1. DO NOT USE NewWidget DIRECTLY! Make a copy of NewWidget and edit that.
 * 2. Make components in ./NewWidgetW.js and ./NewWidgetForm.js.
 * 2. Fix imports above so that you are importing your widget and the form.
 * 3. Fill in details below. Do not remove this section.
 * 4. Uncomment and fill in the details in the export below.
 * 5. Remove all template comments from NewWidget before sending PR.
 */

/** Details:
 * Widget Name:
 * Widget Description: 
 * Author Name:
 * Author GitHub Link:
 */

/**
 * type - (String) Identifier for your widget
 *      - Format: <GITHUB_USERNAME>_<WIDGET_NAME_OR_ABBREVIATION>
 *      - (use ABBREVIATION only when the name is too long)
 * name - (String) Widget Name (displayed in Add Widget page)
 * icon - (Image/ReactComponent) Widget Icon (displayed in Add Widget page)
 *      - TableTop uses react-feather for most icons but you are allowed to use any icon you prefer
 * form - (ReactComponent) WidgetForm component (imported above)
 * el   - (ReactComponent) Widget component (imported above)
 */
export default {
    type: '',
    name: '',
    // icon: < />,
    form: <NewWidgetForm />,
    // @ts-ignore
    el: <NewWidget />,
}