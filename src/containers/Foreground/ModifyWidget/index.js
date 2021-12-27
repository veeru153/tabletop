import React, { useContext } from 'react';
import classes from './ModifyWidget.module.scss';
import PageShell from '../PageShell';
import { Page, Option } from '../../../common/ui'
import { NavContext } from '../../../common/util/contexts';
import * as widgets from '../../../widgets';


const ModifyWidget = ({ modifyWidget, setModifyWidget}) => {
    return (
        <PageShell visibility={modifyWidget} setVisibility={setModifyWidget}>
            <RootModifyWidget />
        </PageShell>
    )
}

const RootModifyWidget = () => {
    const { open } = useContext(NavContext);
    const widgetList = Object.values(widgets);

    return (
        <Page 
            title="Modify Widget"
            subtitle="Tweak your Widget here:"
            className={classes.RootModifyWidget}
        >
            {/* TODO: Add content here */}
        </Page>
    )
}

export default ModifyWidget;