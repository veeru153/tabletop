import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styles from './WeatherSmall.module.css';
import bg from '../assets/backgrounds/backgrounds';
import Icon from '../assets/icons/Icon';
import cuid from 'cuid';
import { fetchData } from '../util';

class WeatherSmall extends Component {
    s = this.props.savedState;
    state = {
        id: this.s?.id ?? cuid(),
        pos: this.s?.pos ?? { x:0, y:0 },
        z: this.props.z,
        data: this.s?.data,
        loading: true,
    }

    async componentDidMount() {
        let tempData = await fetchData(this.props.q);
        this.setState({ 
            data: tempData, loading: false,
        }, () => localStorage.setItem(this.state.id, JSON.stringify(this.state)));
    }

    handleReposition(data) {
        this.setState({ 
            pos: { x: data.x, y: data.y } 
        }, () => localStorage.setItem(this.state.id, JSON.stringify(this.state)));
    }

    render() {
        let w = this.state.loading ? {} : this.state.data;
        let myStyle = this.state.loading ? { } : {
                backgroundImage: `url(${bg[w.weather[0].bg]})`,
                zIndex: this.state.z,
                color: w.weather[0].bg === "cloudD" ? "black" : "white",
            }

        return (
            <Draggable
                bounds="body"
                position={this.state.pos}
                onStop={(e, data) => this.handleReposition(data)}
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