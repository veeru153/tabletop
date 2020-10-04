import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styles from './CovidSmall.module.css';
import cuid from 'cuid';
import { fetchData } from '../util';

class CovidSmall extends Component {
    state = {
        id: `${cuid()}_covid`,
        pos: ['50%', '50%'],
        z: this.props.z,
        territory: "DL",
        district: "Delhi",
        data: {
            "delta": {
                "confirmed": 0,
                "deceased": 0,
                "recovered": 0,
                "tested": 0
            },
            "meta": {
                "population": 0,
                "tested": {
                    "last_updated": "Loading",
                }
            },
            "total": {
                "confirmed": "Loading",
                "deceased": "Loading",
                "recovered": "Loading",
                "tested": "Loading"
            }
        },
    }

    async componentDidMount() {
        const tempData = await fetchData(this.state.territory, this.state.district);
        this.setState({ data: tempData });
        console.log(this.state.data)
    }

    render() {
        const cases = this.state.data;
        return (
            <Draggable
                bounds="body"
                onStop={(e, data) => this.setState({ pos: [data.x, data.y] })}
            >
                <div className={styles.CovidSmall}>
                    <div>
                        <div className={styles.city}>{this.state.district}</div>
                        <div className={styles.lastUpdated}>Last Updated: {cases.meta.tested.last_updated}</div>
                    </div>
                    <div className={styles.info}>
                        <div className={[styles.heading, styles.confirmed].join(' ')}>Confirmed</div>
                        <div className={[styles.delta, styles.confirmed].join(' ')}>
                            +{Number(cases.delta.confirmed).toLocaleString()}
                        </div>
                        <div className={[styles.total, styles.confirmed].join(' ')}>
                            {Number(cases.total.confirmed).toLocaleString()}
                        </div>
                    </div>
                </div>
            </Draggable>
        )
    }
}

export default CovidSmall;