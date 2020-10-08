import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styles from '../Covid.module.css';
import cuid from 'cuid';
import { fetchData, initState } from '../util';

class CovidLarge extends Component {
    s = this.props.savedState;
    state = {
        id: this.s?.id ?? cuid(),
        pos: this.s?.pos ?? { x:0, y:0 },
        z: this.props.z,
        territory: this.s?.territory ?? "DL",
        district: this.s?.state ?? "Delhi",
        data: this.s?.data ?? initState,
    }

    async componentDidMount() {
        const tempData = await fetchData(this.state.territory, this.state.district);
        this.setState({
            data: tempData,
            district: this.state.territory === "TT" ? "India" : this.state.district,
        }, () => localStorage.setItem(this.state.id, JSON.stringify(this.state)));
    } 

    handleReposition(data) {
        this.setState({ 
            pos: { x: data.x, y: data.y } 
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
                onStart={() => this.props.movable}
                onStop={(e, data) => this.handleReposition(data)}
            >
                <div className={[styles.Covid, styles.CovidLarge].join(' ')} style={myStyle}>
                    <div>
                        <div className={styles.city}>{this.state.district}</div>
                        <div className={styles.lastUpdated}>Last Updated: {cases.meta.tested.last_updated}</div>
                    </div>
                    <div className={styles.info}>
                        <div>
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
                        <div>
                            <div className={[styles.heading, styles.active].join(' ')}>Active</div>
                            <div className={[styles.delta, styles.active].join(' ')}>
                                {cases.delta 
                                    ? `${Number(
                                        parseInt(cases.delta.confirmed) - parseInt(cases.delta.recovered) - parseInt(cases.delta.deceased)
                                    ).toLocaleString()}` 
                                    : "--"}
                            </div>
                            <div className={[styles.total, styles.active].join(' ')}>
                                {Number(
                                    parseInt(cases.total.confirmed) - parseInt(cases.total.recovered) - parseInt(cases.total.deceased)
                                ).toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <div className={[styles.heading, styles.recovered].join(' ')}>Recovered</div>
                            <div className={[styles.delta, styles.recovered].join(' ')}>
                                {cases.delta 
                                    ? `+${Number(cases.delta.recovered).toLocaleString()}` 
                                    : "--"}
                            </div>
                            <div className={[styles.total, styles.recovered].join(' ')}>
                                {Number(cases.total.recovered).toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <div className={[styles.heading, styles.deceased].join(' ')}>Deceased</div>
                            <div className={[styles.delta, styles.deceased].join(' ')}>
                                {cases.delta 
                                    ? `+${Number(cases.delta.deceased).toLocaleString()}` 
                                    : "--"}
                            </div>
                            <div className={[styles.total, styles.deceased].join(' ')}>
                                {Number(cases.total.deceased).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        )
    }
}

export default CovidLarge;