import Page from '../../../../../common/ui/PageTemplate';
import General from './General';
import BackupRestore from './BackupRestore';

const Configure = () => {
    return (
        <Page 
            title="Configure"
            subtitle="Tweak your Dashboard:"
        >
            <General />
            <BackupRestore />
        </Page>
    )
}

export default Configure;