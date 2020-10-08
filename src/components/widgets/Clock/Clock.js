import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styles from './Clock.module.css';
import cuid from 'cuid';
import { DateTime } from 'luxon';

class Clock extends Component {
    s = this.props.savedState;
    state = {
        id: this.s?.id ?? cuid(),
        pos: this.s?.pos ?? { x: 0, y: 0 },
        z: this.props.z,
        data: {
            label: this.props.q[0],
            tz: this.props.q[1],
            rots: {
                hr: 0,
                min: 0,
                sec: 0,
            }
        }
    }

    componentDidMount() {
        setInterval(() => {
            let dt = DateTime.local().setZone(this.state.data.tz);
            let hr = dt.hour;
            let min = dt.minute;
            let sec = dt.second;
            this.setState({
                data: {
                    ...this.state.data,
                    rots: {
                        hr: hr * 360 / 12 + ((min * 360 / 60) / 12),
                        min: (min * 360 / 60) + (sec * 360 / 60) / 60,
                        sec: sec * 360 / 60,
                    }
                }
            })
        }, 1000)
    }

    handleReposition(data) {
        this.setState({
            pos: { x: data.x, y: data.y }
        }, () => localStorage.setItem(this.state.id, JSON.stringify(this.state)));
    }

    render() {
        const rots = this.state.data.rots;
        const handStyles = {
            hr: {
                transform: `rotate(${rots.hr}deg)`
            },
            min: {
                transform: `rotate(${rots.min}deg)`
            },
            sec: {
                transform: `rotate(${rots.sec}deg)`
            }
        }
        return (
            <Draggable
                bounds="body"
                position={this.state.pos}
                onStart={() => this.props.movable}
                onStop={(e, data) => this.handleReposition(data)}
            >
                <div className={styles.Clock} style={{ zIndex: this.state.z }}>
                    <div className={styles.clockbox}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                            <g id="face">
                                <circle className={styles.circle} cx="300" cy="300" r="253.9" />
                                <path className={styles.hourMarks} d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6" />
                                <circle className={styles.midCircle} cx="300" cy="300" r="16.2" />
                            </g>
                            <g id="hour" className={styles.hand} style={handStyles.hr}>
                                <path className={styles.hourArm} d="M300.5 298V142" />
                                <circle className={styles.sizingBox} cx="300" cy="300" r="253.9" />
                            </g>
                            <g id="minute" className={styles.hand} style={handStyles.min}>
                                <path className={styles.minuteArm} d="M300.5 298V67" />
                                <circle className={styles.sizingBox} cx="300" cy="300" r="253.9" />
                            </g>
                            <g id="second" className={styles.hand} style={handStyles.sec}>
                                <path className={styles.secondArm} d="M300.5 350V55" />
                                <circle className={styles.sizingBox} cx="300" cy="300" r="253.9" />
                            </g>
                        </svg>
                    </div>
                    <div className={styles.label}>{this.state.data.label}</div>
                </div>
            </Draggable>
        )
    }
}

export default Clock;