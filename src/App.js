import React, { useState, useEffect } from 'react';
import { db, CONFIG } from './util/db';
import * as DEFAULTS from './util/defaults';
import TableTop from './containers/TableTop';
import Dashboard from './containers/Dashboard';

function App() {
    const [loaded, setLoaded] = useState(false);

    const initialiseApp = async () => {
        const config = await db.collection(CONFIG).get({ keys: true });
        if(!config || config.length === 0) {
            db.collection(CONFIG).doc('bg').set(DEFAULTS.BG)
        }
        setLoaded(true);
    }
    useEffect(() => initialiseApp(), [])

    return <TableTop loaded={loaded}/>
}

export default App;
