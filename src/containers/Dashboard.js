import React, { useState, useEffect } from 'react';
import { db, CONFIG, WIDGETS } from '../util/db';
import cuid from 'cuid';
import Settings from './Settings/Settings';
import { ConfigContext } from '../util/contexts';
import WidgetRenderer from './WidgetRenderer';

const Dashboard = () => {
    const [bg, setBg] = useState(defaultBgState);
    const [widgets, setWidgets] = useState([]);
    const [showSettings, setShowSettings] = useState(false);

    // Fetch Background Data and Widgets from IndexedDB on mount
    useEffect(() => {
        async function onMount() {
            const newBg = await db.collection(CONFIG).doc('bg').get();
            setBg(newBg);
            const w = await db.collection(WIDGETS).get({ keys: true });
            setWidgets(w);
        }
        onMount();
    }, [])

    const imgStyles = { 
        ...defaultStyles,
        backgroundImage: `url(${bg.image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
    const colorStyles  = { 
        ...defaultStyles,
        backgroundColor: bg.color,
    };

    const addWidget = (type, q) => {
        const id = cuid();
        const template = {
            key: id,
            data: {
                meta: { 
                    pos: { x: 0, y: 0 }, 
                    type: type, 
                    z: widgets.length + 1, 
                    q: q 
                },
                params: {}
            }
        }
        setWidgets([...widgets, template]);
        db.collection(WIDGETS).add(template.data, id);
        setShowSettings(false);
    }

    const removeWidget = (id) => {
        const tempW = [...widgets];
        const widgetToRemove = tempW.find(w => w.key === id);
        const widgetIdx = tempW.indexOf(widgetToRemove);
        tempW.splice(widgetIdx, 1);
        setWidgets(tempW);
        db.collection(WIDGETS).doc(id).delete();
    }

    const configHandlers = { addWidget, removeWidget, bg, setBg, widgets, setWidgets, showSettings, setShowSettings };

    return (
        <div style={bg.usingImg ? imgStyles : colorStyles}>
            <ConfigContext.Provider value={configHandlers}>
                <Settings />
            </ConfigContext.Provider>
            {widgets.map(w => <WidgetRenderer key={w.key} id={w.key} data={w.data}/>)}
            <button
                style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 999999 }}
                onClick={() => setShowSettings(!showSettings)}
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
    width: '100%',
    height: '100vh',
}

export default Dashboard;