import React, { useRef, useContext } from 'react';
import { Button, Accordion } from '../../../../../common/ui';
import { WIDGETS, CONFIG } from '../../../../../common/util/db';
import { ConfigContext, NavContext } from '../../../../../common/util/contexts';
import { DateTime } from 'luxon';

const BackupRestore = () => {
    const { reload } = useContext(ConfigContext);
    const { close } = useContext(NavContext);
    const fileInput = useRef(null);

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
        
        // Removing Local Image
        backup.config.bg.image = "";
        // Maybe TODO: Allow users to select if they want to backup local image

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
            console.log(backup);
            
            await restoreWidgets(backup.widgets);
            await restoreConfig(backup.config);
            close();
            reload("Restoring from Backup...");
        }
        reader.readAsText(e.target.files[0]);
    }

    const restoreWidgets = async (wList) => {
        const _setWidget = async (w) => {
            await WIDGETS.setItem(w.key, w);
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

    return (
            <Accordion title="Backup & Restore">
                <h3 style={styles.label}>Backups will NOT include Secret Tokens and Local Image.</h3>
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