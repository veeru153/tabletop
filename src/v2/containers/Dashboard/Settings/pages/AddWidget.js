import React, { useContext } from 'react';
import classes from '../Settings.module.scss';
import Page from '../../../../common/ui/PageTemplate';
import Option from '../../../../common/ui/PageOption';
import { NavContext } from '../../../../common/util/contexts';
import * as widgets from '../../../../widgets';

const AddWidgetForm = () => {
    const { open } = useContext(NavContext);
    const widgetList = Object.values(widgets);

    return (
        <Page 
            title="Add Widget"
            subtitle="Choose a Widget:"
            className={classes.RootSettings}
        >
            {widgetList.map(w => {
                const { id, name, icon, form } = w;
                const optProps = {
                    key: id,
                    name,
                    icon,
                    next: () => open(form),
                }
                return <Option {...optProps} />
            })}
    </Page>
    )
}

export default AddWidgetForm;