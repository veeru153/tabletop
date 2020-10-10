import React, { Component } from 'react';
import Widget from '../Widget/Widget';
import * as w from '../Widget/wKey';
import MenuBar from '../Menu/MenuBar';
import cuid from 'cuid';
import AddWidgetPanel from '../AddWidget/AddWidgetPanel';
import { WidgetProvider } from './contexts';

class Dashboard extends Component {
    state = {
        bg: {
            type: 'color',
            image: null,
            color: '#282c34',
        },
        movable: false,
        addMode: false,
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
        const widgetInit = {
            id: wId,
            z: wInfo.z,
            pos: { x: 0, y: 0 }
        }
        localStorage.setItem(wId, JSON.stringify(widgetInit));
        this.setState((prevState) => ({ 
            widgets: tempWidgets,
            zCount: prevState.zCount + 1,
        }), () => {
            localStorage.setItem('widgets', JSON.stringify(this.state.widgets));
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
        if(!['movable', 'addMode', 'deleteMode',].includes(setting)) return;
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
                    deleteMode={this.state.deleteMode}
                    addMode={this.state.addMode}
                    toggleSetting={this.toggleSetting} 
                />
                {/* <WidgetProvider value={this.addWidget}>
                    <AddWidgetPanel />
                </WidgetProvider> */}
            </div>
        )
    }
}

export default Dashboard;