import { useState, useRef, useContext } from 'react';
import { Button, Accordion, Checkbox } from '../../../../../common/ui';
import { WIDGETS, CONFIG } from '../../../../../common/util/db';
import { cookies, SECRETS } from '../../../../../common/util/cookies';
import { ConfigContext, NavContext } from '../../../../../common/util/contexts';
import { DateTime } from 'luxon';

const BackupRestore = () => {
    const { reload } = useContext(ConfigContext);
    const { close } = useContext(NavContext);
    const fileInput = useRef(null);
    const [backupLocal, setBackupLocal] = useState(false);
    const [backupSecrets, setBackupSecrets] = useState(false);

    const generateBackup = async () => {
        const backup = {
            widgets: [],
            config: {},
        };

        await WIDGETS.iterate(w => {
            backup.widgets.push(w);
            console.log(`Backed up: Widget ID - ${w.id}`);
        });
        await CONFIG.iterate((val, key) => {
            backup.config[key] = val;
            console.log(`Backed up: Configuration - ${key}`);
        });
        if(!backupLocal) backup.config.bg.image = "";

        if(backupSecrets) {
            const fetchedSecretDoc = await cookies.get(SECRETS) ?? {};
            backup['secrets'] = { ...fetchedSecretDoc };
        }

        const backupStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", backupStr);
        downloadAnchorNode.setAttribute("download", `tabletop-backup-${DateTime.now().toISODate()}.json`);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    const openFilePicker = () => fileInput.current.click();

    const restoreFromFile = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const backup = JSON.parse(e.target.result);
            
            await restoreWidgets(backup.widgets);
            await restoreConfig(backup.config);
            backup.secrets && await restoreSecrets(backup.secrets);

            close();
            reload("Restoring from Backup...");
        }
        reader.readAsText(e.target.files[0]);
    }

    const restoreWidgets = async (wList) => {
        const _setWidget = async (w) => {
            await WIDGETS.setItem(w.id, w);
            return Promise.resolve(); 
        }

        return Promise.all(wList.map(w => _setWidget(w)));
    }

    const restoreConfig = async (_config) => {
        const config = Object.entries(_config);
        const _setConfig = async (c) => {
            await CONFIG.setItem(c[0], c[1]);
            return Promise.resolve();
        }

        return Promise.all(config.map(c => _setConfig(c)));
    }

    const restoreSecrets = async (values) => {
        const expiryDate = new Date("2038-01-19T04:14:07");
        cookies.set(SECRETS, values, { expires: expiryDate });
    }

    return (
            <Accordion title="Backup & Restore">
                <h3 style={styles.label}>Backups will NOT include Secret Tokens.</h3>
                <Checkbox
                    checked={backupLocal}
                    onClick={() => setBackupLocal(!backupLocal)}
                >Backup Local Image (Results in slower and larger backups.)</Checkbox>
                <Checkbox
                    checked={backupSecrets}
                    onClick={() => setBackupSecrets(!backupSecrets)}
                >Backup Secrets (For personal use only. Do not share this backup.)</Checkbox>
                <div style={styles.BackupRestore}>
                    <Button onClick={generateBackup}>Backup</Button>
                    <Button onClick={openFilePicker}>Restore</Button>
                    <input 
                        ref={fileInput} 
                        type="file" 
                        accept="application/json" 
                        onChange={restoreFromFile}
                        style={{ display: 'none' }} 
                    />
                </div>
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