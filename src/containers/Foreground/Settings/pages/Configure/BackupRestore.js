import React from 'react';
import { Accordion } from '../../../../../common/ui';

const BackupRestore = () => {
    return (
            <Accordion title="Backup & Restore">
                <h3 style={styles.label}>Backup and Restore your configurations in seconds.</h3>
                <p>Migrate your data from one device to another or synchronise your configurations across browsers with ease.</p>
            </Accordion>
    )
}

const styles = {
    BackupRestore: {
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
    },
    label: {
        marginTop: 0
    }
}

export default BackupRestore;