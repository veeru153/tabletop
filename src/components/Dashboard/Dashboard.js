import React, { Component } from 'react';
import CovidSmall from '../widgets/Covid19India/CovidSmall/CovidSmall';
import CovidLarge from '../widgets/Covid19India/CovidLarge/CovidLarge';
import WeatherSmall from '../widgets/Weather/WeatherSmall/WeatherSmall';
import StickyNote from '../widgets/StickyNote/StickyNote';

class Dashboard extends Component {
    state = {
        bg: {
            type: 'color',
            image: null,
            color: '#282c34',
        },
        widgets: [
            { id: 'weatherS_ckfwpeom600013j5zyz7l4fg2', q: ["Delhi, IN"] },
            { id: 'weatherS_ckfwpeomf00033j5zgaxhdcnj', q: ["Ottawa, CA"] },
            { id: 'covidL_ckfwpeoml00073j5zwge5v2yu', q: ["DL", "Delhi"] },
            { id: 'covidS_ckfwpeomh00053j5zie3u2ebo', q: ["TT", "India"] },
            { id: 'sticky_ckfwpeomp00093j5z9q2405r6' },
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
            height: '100vh',
        }

        return (
            <div style={styles}>
                {this.state.widgets.map(w => {

                })}
                <WeatherSmall z={1} savedState={this.getSavedState('weatherS_ckfwpeom600013j5zyz7l4fg2')} q="Delhi, IN"/>
                <WeatherSmall z={2} savedState={this.getSavedState('weatherS_ckfwpeomf00033j5zgaxhdcnj')} q="Ottawa, CA"/>
                <CovidSmall z={3} savedState={this.getSavedState('covidS_ckfwpeomh00053j5zie3u2ebo')}/>
                <CovidLarge z={4} savedState={this.getSavedState('covidL_ckfwpeoml00073j5zwge5v2yu')}/>
                <StickyNote z={5} savedState={this.getSavedState('sticky_ckfwpeomp00093j5z9q2405r6')}/>
            </div>
        )
    }
}

export default Dashboard;