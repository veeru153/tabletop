import React, { useState, useEffect } from 'react';
// import Widget from './Widget';
import Weather from '../widgets/Weather/Weather';
import db from '../util/db';

const Dashboard = () => {
    const [bg, setBg] = useState(defaultBgState);
    const [widgets, setWidgets] = useState([]);

    // Update Background Config in DB when state is updated
    useEffect(() => db.collection("tabletop_config").add(bg, 'bg'), [bg]);
    let styles = {...defaultStyles, background: bg.usingImg ? `url(${bg.image})` : bg.color};
    
    return (
        <div style={styles}>
            <Weather />
        </div>
    )
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