import React, { Component } from 'react';
import Widget from '../Widget/Widget';
import * as w from '../Widget/wKey';
import MenuBar from '../Menu/MenuBar';
import cuid from 'cuid';
import AddWidgetPanel from '../AddWidget/AddWidgetPanel';

class Dashboard extends Component {
    state = {
        bg: {
            type: 'color',
            image: null,
            color: '#282c34',
        },
        movable: false,
        deleteMode: false,
        loading: true,
        widgets: {},
        zCount: 1,
    }

    componentDidMount() {
        const widgets = JSON.parse(localStorage.getItem('widgets'));
        if(widgets !== null) {
            this.setState({ widgets: widgets, loading: false });
        }
    }

    addWidget = (type, q) => {
        let tempWidgets = { ...this.state.widgets };
        const wId = cuid();
        const wInfo = {
            type: type,
            z: this.state.zCount,
            q: q,
        }

        tempWidgets[wId] = wInfo;
        this.setState((prevState) => ({ 
            widgets: tempWidgets,
            zCount: prevState.zCount + 1,
        }), () => {
            const widgetInit = {
                id: wId,
                z: wInfo.z,
                pos: { x: 500, y: 500 }
            }
            localStorage.setItem('widgets', JSON.stringify(this.state.widgets));
            localStorage.setItem(wId, JSON.stringify(widgetInit));
            localStorage.setItem('zCount', this.state.zCount);
        });
    }

    removeWigdet = (wId) => {
        let tempWidgets = { ...this.state.widgets };
        delete tempWidgets[wId];
        this.setState({ 
            widgets: tempWidgets,
        }, () => localStorage.setItem('widgets', JSON.stringify(this.state.widgets)));
    }

    toggleSetting = (setting) => {
        if(!['movable', 'deleteMode'].includes(setting)) return;
        this.setState((prevState) => ({
            [setting]: !prevState[setting]
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
                <MenuBar 
                    movable={this.state.movable}
                    toggleSetting={this.toggleSetting} 
                    deleteMode={this.state.deleteMode}
                />
                <AddWidgetPanel />
            </div>
        )
    }
}

export default Dashboard;