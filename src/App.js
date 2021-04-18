import React, { useState, useEffect } from 'react';
import { db, CONFIG } from './util/db';
import * as DEFAULTS from './util/defaults';
import { cookies, SECRETS } from './util/cookies';
import TableTop from './containers/TableTop';

function App() {
    const [loaded, setLoaded] = useState(false);

    const initialiseApp = async () => {
        const config = await db.collection(CONFIG).get({ keys: true });
        console.log(config);
        if(!config || config.length === 0) {
            db.collection(CONFIG).doc('bg').set(DEFAULTS.BG);
            db.collection(CONFIG).doc('meta').set(DEFAULTS.META);
            const expiryDate = new Date("2038-01-19T04:14:07");
            cookies.set(SECRETS, { }, { expires: expiryDate });
        }
        setLoaded(true);
    }
    useEffect(() => initialiseApp(), [])

    return <TableTop loaded={loaded}/>
}

export default App;
