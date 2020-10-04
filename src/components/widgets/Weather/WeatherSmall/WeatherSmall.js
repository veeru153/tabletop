import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styles from './WeatherSmall.module.css';
import bg from '../assets/backgrounds/backgrounds';
import Icon from '../assets/icons/Icon';
import cuid from 'cuid';
import { fetchData } from '../util';

// TODO: Use data that will be saved in Local Storage.

class WeatherSmall extends Component {
    state = {
        id: `${cuid()}_weather`,
        pos: [0, 0],
        z: this.props.z,
        loading: true,
        data: {
            "id": 0,
            "name": "Loading",
            "coord": {
                "lat": 0,
                "lon": 0
            },
            "main": {
                "temp": 0,
                "feels_like": 0,
                "temp_min": 0,
                "temp_max": 0,
                "pressure": 0,
                "humidity": 0
            },
            "dt": 0,
            "wind": {
                "speed": 0,
                "deg": 0
            },
            "sys": {
                "country": "XX"
            },
            "rain": null,
            "snow": null,
            "clouds": {
                "all": 0
            },
            "weather": [
                {
                    "id": 0,
                    "main": "loading",
                    "description": "Loading",
                    "icon": "loading"
                }
            ]
        },
    }

    async componentDidMount() {
        let tempData = await fetchData("Delhi");
        this.setState({ data: tempData, loading: false, });
    }

    render() {
        const w = this.state.data;
        const myStyle = {
            backgroundImage: `url(${bg[w.weather[0].icon]})`,
            transform: `translate(${this.state.pos[0]}, ${this.state.pos[1]})`,
            zIndex: this.state.z,
        }

        return (
            <Draggable
                bounds="body"
                onStop={(e, data) => this.setState({ pos: [data.x, data.y] })}
            >
                {!this.state.data ? <div></div> :
                    <div className={styles.WeatherSmall} style={myStyle}>
                        <div>
                            <div className={styles.city}>{w.name}</div>
                            <div className={styles.temp}>{Math.round(w.main.temp)}°C</div>
                        </div>
                        <div className={styles.info}>
                            <Icon name={w.weather[0].icon} />
                            <div className={styles.condn}>{w.weather[0].description}</div>
                            <div className={styles.hl}>
                                <div>H: {Math.round(w.main.temp_max)}°C</div>
                                <div>L: {Math.round(w.main.temp_min)}°C</div>
                            </div>
                        </div>
                    </div>}
            </Draggable>
        )
    }
}

export default WeatherSmall;