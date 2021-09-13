import React, { useContext } from 'react';
import classes from '../Settings.module.scss';
import Page from '../../../../common/ui/PageTemplate';
import Option from '../../../../common/ui/PageOption';
import { Button, Accordion } from '../../../../common/ui';
import { WIDGETS, CONFIG } from '../../../../common/util/db';
import { DateTime } from 'luxon'

const Configure = () => {

    const generateBackup = async () => {
        const backup = {
            widgets: [],
            config: {},
        };

        await WIDGETS.iterate(w => {
            backup.widgets.push(w);
            console.log(`Backed up: Widget ID - ${w.key}`);
        });
        await CONFIG.iterate((val, key) => {
            backup.config[key] = val;
            console.log(`Backed up: Configuration - ${key}`);
        });
        
        // TODO: Replace bg2 with bg only
        backup.config.bg.image = "";
        backup.config.bg2.image = "";

        const backupStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", backupStr);
        downloadAnchorNode.setAttribute("download", `tabletop-backup-${DateTime.now().toISODate()}.json`);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();

        console.log(backup);
    }

    return (
        <Page 
            title="Configure"
            subtitle="Tweak your Dashboard:"
        >
            <Accordion 
                title="Backup & Restore"
            >
                <h3 style={styles.label}>Backups will NOT include Secret Tokens and Local Image.</h3>
                <div style={styles.BackupRestore}>
                    <Button onClick={generateBackup}>Backup</Button>
                    <Button>Restore</Button>
                </div>
            </Accordion>
        </Page>
    )
}

const styles = {
    BackupRestore: {
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
    },
    label: {
        marginTop: 4
    }
}

export default Configure;