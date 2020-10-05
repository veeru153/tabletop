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
        id: `${cuid()}_weatherS`,
        pos: { x:0, y:0 },
        z: this.props.z,
        loading: true,
        data: {...this.props.savedState, loading: true},
    }

    async componentDidMount() {
        let tempData = await fetchData("Delhi");
        this.setState({ 
            data: tempData, loading: false,
        }, () => localStorage.setItem(this.state.id, JSON.stringify(this.state)));
    }

    render() {
        let w = this.state.loading ? {} : this.state.data;
        let myStyle = this.state.loading ? { } : {
                backgroundImage: `url(${bg[w.weather[0].icon]})`,
                zIndex: this.state.z,
            }

        return (
            <Draggable
                bounds="body"
                position={this.state.pos}
                onStop={(e, data) => this.setState({ pos: {x: data.x, y: data.y} })}
            >
                {this.state.loading ? <div></div> :
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