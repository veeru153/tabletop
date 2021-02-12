import React, { useState, useEffect } from 'react';
import { config, widgets } from '../util/db';

const Dashboard = () => {
    const [bg, setBg] = useState(defaultBgState);
    const [widgets, setWidgets] = useState([]);

    // Update Background Config in DB when state is updated
    useEffect(() => config.add(bg, 'bg'), [bg]);
    let styles = {...defaultStyles, background: bg.usingImg ? `url(${bg.image})` : bg.color};
    
    return (
        <div style={styles}>
            
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