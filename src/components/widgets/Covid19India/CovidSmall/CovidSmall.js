import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styles from '../Covid.module.css';
import cuid from 'cuid';
import { fetchData } from '../util';

class CovidSmall extends Component {
    state = {
        id: `${cuid()}_covid`,
        pos: { x:0, y:0 },
        z: this.props.z,
        territory: "TT",
        district: null,
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
        this.setState({
            data: tempData,
            district: this.state.territory === "TT" ? "India" : this.state.district,
        }, () => localStorage.setItem(this.state.id, JSON.stringify(this.state)));
    }

    render() {
        const cases = this.state.data;
        const myStyle = {
            zIndex: this.state.z,
        }
        return (
            <Draggable
                bounds="body"
                position={this.state.pos}
                onStop={(e, data) => this.setState({ pos: {x: data.x, y: data.y} })}
            >
                <div className={[styles.Covid, styles.CovidSmall].join(' ')} style={myStyle}>
                    <div>
                        <div className={styles.city}>{this.state.district}</div>
                        <div className={styles.lastUpdated}>Last Updated: {cases.meta.tested.last_updated}</div>
                    </div>
                    <div className={styles.info}>
                        <div className={[styles.heading, styles.confirmed].join(' ')}>Confirmed</div>
                        <div className={[styles.delta, styles.confirmed].join(' ')}>
                            {cases.delta 
                                ? `+${Number(cases.delta.confirmed).toLocaleString()}` 
                                : "--"}
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