import React from 'react';
import Page from '../../../../../common/ui/PageTemplate';
import BackupRestore from './BackupRestore';

const Configure = () => {
    return (
        <Page 
            title="Configure"
            subtitle="Tweak your Dashboard:"
        >
            <BackupRestore />
        </Page>
    )
}

export default Configure;