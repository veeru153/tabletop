import React, { Component } from 'react';
import CovidSmall from '../widgets/Covid19India/CovidSmall/CovidSmall';
import CovidLarge from '../widgets/Covid19India/CovidLarge/CovidLarge';
import WeatherSmall from '../widgets/Weather/WeatherSmall/WeatherSmall';
import StickyNote from '../widgets/StickyNote/StickyNote';
import Clock from '../widgets/Clock/Clock';

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
            { id: 'sticky_ckfwpeomp00093j5z9q2405r6', q: [""] },
            { id: 'clock_ckfxl7wcy00013j5zp50drlyp', q: ["New Delhi", "UTC+5:30"]},
            { id: 'clock_ckfxl7wd100033j5zynmoqp97', q: ["Ottawa", "UTC-5"]},
            { id: 'clock_ckfxl7wd400053j5zdfml6xnd', q: ["Tel Aviv", "UTC+2"]},
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
                {/* {this.state.widgets.map(w => {

                })} */}
                <WeatherSmall z={1} q="Delhi, IN" savedState={this.getSavedState('weatherS_ckfwpeom600013j5zyz7l4fg2')} />
                <WeatherSmall z={2} q="Ottawa, CA" savedState={this.getSavedState('weatherS_ckfwpeomf00033j5zgaxhdcnj')} />
                <CovidSmall z={3} savedState={this.getSavedState('covidS_ckfwpeomh00053j5zie3u2ebo')}/>
                <CovidLarge z={4} savedState={this.getSavedState('covidL_ckfwpeoml00073j5zwge5v2yu')}/>
                <StickyNote z={5} savedState={this.getSavedState('sticky_ckfwpeomp00093j5z9q2405r6')}/>
                <Clock z={6} q={["New Delhi", "UTC+5:30"]} savedState={this.getSavedState('clock_ckfxl7wcy00013j5zp50drlyp')}/>
                <Clock z={6} q={["Ottawa", "UTC-5"]} savedState={this.getSavedState('clock_ckfxl7wd100033j5zynmoqp97')}/>
                <Clock z={6} q={["Tel Aviv", "UTC+2"]} savedState={this.getSavedState('clock_ckfxl7wd400053j5zdfml6xnd')}/>
            </div>
        )
    }
}

export default Dashboard;