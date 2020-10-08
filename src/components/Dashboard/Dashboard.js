import React, { Component } from 'react';
import Widget from '../Widget/Widget';
import * as w from '../Widget/wKey';
import MenuBar from '../Menu/MenuBar';
import cuid from 'cuid';

class Dashboard extends Component {
    state = {
        bg: {
            type: 'color',
            image: null,
            color: '#282c34',
        },
        movable: false,
        loading: true,
        widgets: {},
    }

    componentDidMount() {
        const widgets = JSON.parse(localStorage.getItem('widgets'));
        if(widgets !== null) {
            this.setState({ widgets: widgets, loading: false });
        }
    }

    addWidget = (type, z, q) => {
        let tempWidgets = { ...this.state.widgets };
        const wId = cuid();
        const wInfo = {
            type: type,
            z: z,
            q: q,
        }

        tempWidgets[wId] = wInfo;
        this.setState({ 
            widgets: tempWidgets 
        }, () => localStorage.setItem('widgets', JSON.stringify(this.state.widgets)));
    }

    removeWigdet = (wId) => {
        let tempWidgets = { ...this.state.widgets };
        delete tempWidgets[wId];
        this.setState({ 
            widgets: tempWidgets,
        }, () => localStorage.setItem('widgets', JSON.stringify(this.state.widgets)));
    }

    toggleMovable = () => {
        this.setState((prevState) => ({
            movable: !prevState.movable
        }))
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
                {this.state.loading 
                    ? <div>Loading...</div> 
                    : Object.keys(this.state.widgets).map(wId => {
                        const { type, q, z } = wList[wId];
                        return (
                            <Widget id={wId} z={z} type={type} q={q} movable={this.state.movable} />
                        )
                    })}
                <MenuBar toggleMovable={this.toggleMovable} />
            </div>
        )
    }
}

export default Dashboard;