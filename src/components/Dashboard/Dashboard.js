import React, { Component } from 'react';
import WeatherSmall from '../widgets/Weather/WeatherSmall/WeatherSmall';

class Dashboard extends Component {
    state = {
        bg: {
            type: 'color',
            image: null,
            color: '#282c34',
        }
    }

    render() {
        const bgConfig = this.state.bg;

        const styles = {
            background: bgConfig.type === 'image' ? `url(${bgConfig.image})` : bgConfig.color,
            backgroundSize: 'contain',
            width: '100%',
            height: '100vh'
        }

        return (
            <div style={styles}>
                <WeatherSmall />
            </div>
        )
    }
}

export default Dashboard;