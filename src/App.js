import React, { useState, useEffect } from 'react';
import { db, CONFIG } from './util/db';
import Dashboard from './containers/Dashboard';

// TODO: Implement User Side API Key. Store in Cache probably. Using .env in Development.


function App() {
    const [loaded, setLoaded] = useState(false);

    const initialiseApp = () => {
        db.collection(CONFIG).get({ keys: true })
            .then(config => {
                if (!config || config.length === 0) {
                    db.collection(CONFIG).doc('bg').set({
                        usingImg: false,
                        image: null,
                        color: '#282c34', // Default
                    })
                    db.collection(CONFIG).doc('secrets').set({ });
                }
            })
            .then(() => setLoaded(true));
    }
    useEffect(() => initialiseApp(), [])

    return loaded ? <Dashboard /> : <div>Loading...</div>
}

export default App;
