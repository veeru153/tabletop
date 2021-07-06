import React, { useContext } from 'react';
import classes from './AddWidget.module.scss';
import { Page, Option  } from '../../../common/ui'
import { NavContext } from '../../../common/util/contexts';
import * as widgets from '../../../widgets';

const AddWidget = () => {
    const { open } = useContext(NavContext);
    const widgetList = Object.values(widgets);

    return (
        <Page 
            title="Add Widget"
            subtitle="Choose a Widget:"
            className={classes.RootAddWidget}
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

export default AddWidget;