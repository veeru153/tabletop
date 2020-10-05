import React, { Component } from 'react';
import CovidSmall from '../widgets/Covid19India/CovidSmall/CovidSmall';
import CovidLarge from '../widgets/Covid19India/CovidLarge/CovidLarge';
import WeatherSmall from '../widgets/Weather/WeatherSmall/WeatherSmall';

class Dashboard extends Component {
    state = {
        bg: {
            type: 'color',
            image: null,
            color: '#282c34',
        },
        widgets: [
            'ckfw1ehvm00013j5z6wp11zct_weatherS',
            'ckfw16ppm00053j5zxan2v2v2_covidS',
            'ckfw1c7vg00033j5ztcbbf7w4_covidL',
        ]
    }

    getSavedState = (id) => {
        return JSON.parse(localStorage.getItem(id));
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
                <WeatherSmall z={1} savedState={this.getSavedState('ckfw1ehvm00013j5z6wp11zct_weatherS')}/>
                <CovidSmall z={2} savedState={this.getSavedState('ckfw16ppm00053j5zxan2v2v2_covidS')}/>
                <CovidLarge z={3} savedState={this.getSavedState('ckfw16ppm00053j5zxan2v2v2_covid')}/>
            </div>
        )
    }
}

export default Dashboard;