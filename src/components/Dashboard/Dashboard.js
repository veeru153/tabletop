import React, { Component } from 'react';
import Widget from '../Widget/Widget';
import * as w from '../Widget/wKey';

class Dashboard extends Component {
    state = {
        bg: {
            type: 'color',
            image: null,
            color: '#282c34',
        },
        widgets: {
            'ckfwpeom600013j5zyz7l4fg2': {
                type: w.WeatherSmall,
                z: 1,
                q: "Delhi, IN",
            },
            'ckfwpeomf00033j5zgaxhdcnj': {
                type: w.WeatherSmall,
                z: 2,
                q: "Ottawa, CA",
            },
            'ckfwpeoml00073j5zwge5v2yu': {
                type: w.CovidLarge,
                z: 3,
                q: ["DL", "Delhi"],
            },
            'ckfwpeomh00053j5zie3u2ebo': {
                type: w.CovidSmall,
                z: 4,
                q: ["TT", "India"],
            },
            'ckfwpeomp00093j5z9q2405r6': {
                type: w.StickyNote,
                z: 4,
                q: "",
            },
            'ckfxl7wcy00013j5zp50drlyp': {
                type: w.Clock,
                z: 5,
                q: ["New Delhi", "UTC+5:30"],
            },
            'ckfxl7wd100033j5zynmoqp97': {
                type: w.Clock,
                z: 6,
                q: ["Ottawa", "UTC-5"],
            },
            'ckfxl7wd400053j5zdfml6xnd': {
                type: w.Clock,
                z: 7,
                q: ["Tel Aviv", "UTC+2"],
            }

        }
    }

    render() {
        const bgConfig = this.state.bg;

        const styles = {
            background: bgConfig.type === 'image' ? `url(${bgConfig.image})` : bgConfig.color,
            backgroundSize: 'contain',
            width: '100%',
            height: '100vh',
        }

        const wList = this.state.widgets;

        return (
            <div style={styles}>
                {Object.keys(this.state.widgets).map(wId => {
                    const { type, q, z } = wList[wId];
                    return (
                        <Widget id={wId} z={z} type={type} q={q} />
                    )
                })}
            </div>
        )
    }
}

export default Dashboard;