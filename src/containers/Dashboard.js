import React, { useState, useEffect } from 'react';
import * as W from '../widgets/';
import { db, CONFIG, WIDGETS } from '../util/db';
import cuid from 'cuid';

const Dashboard = () => {
    const [bg, setBg] = useState(defaultBgState);
    const [widgets, setWidgets] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Fetch Background Data and Widgets from IndexedDB on mount
    useEffect(() => db.collection(CONFIG).doc('bg').get().then(bg => setBg(bg)), []);

    // Update Background Config in DB when state is updated
    let styles = { 
        ...defaultStyles, 
        background: bg.usingImg ? `url(${bg.image})` : bg.color ,
    };

    const addWidget = (type, params) => {
        const id = cuid();
        const template = {
            key: id,
            data: {
                meta: { pos: { x: 0, y: 0 }, type: type, z: 1 },
                params: params
            }
        }
        setWidgets([...widgets, template]);
        db.collection(WIDGETS).add(template.data, id);
    }

    return (
        <div style={styles}>
            {/* <W.Clock /> */}
            {/* <W.Weather /> */}
            <button
                style={{ position: 'absolute', bottom: 0, right: 0 }}
                onClick={() => addWidget("Weather", dummyData)}
            >Click</button>
        </div>
    )
}

const dummyData = {
    clouds: { all: 0 },
    coord: { lat: 28.6128, lon: 77.2311 },
    dt: 1613203762,
    id: 1261481,
    main: {
        feels_like: 23.43,
        humidity: 60,
        pressure: 1016,
        temp: 23,
        temp_max: 23,
        temp_min: 23
    },
    name: "New Delhi",
    rain: null,
    snow: null,
    sys: { country: "IN" },
    weather: [{
        description: "haze",
        icon: "50d",
        id: 721,
        main: "Haze",
    }],
    wind: { speed: 1.59, deg: 256 },
}

const defaultBgState = {
    usingImg: false,
    image: null,
    color: '#282c34', // Default
}

const defaultStyles = {
    backgroundSize: 'contain',
    width: '100%',
    height: '100vh',
}

export default Dashboard;