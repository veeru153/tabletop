import React, { Component } from 'react';
import Widget from '../Widget/Widget';
import * as w from '../Widget/wKey';
import MenuBar from '../Menu/MenuBar';
import cuid from 'cuid';
import AddWidgetPanel from '../AddWidget/AddWidgetPanel';
import { WidgetProvider } from './contexts';
import Settings from '../Settings/Settings';

class Dashboard extends Component {
    state = {
        bg: {
            type: 'color',
            image: null,
            color: '#282c34', // Default
        },
        movable: false,
        addMode: false,
        deleteMode: false,
        settingsExpanded: false,
        loading: true,
        widgets: {},
        zCount: 1,
    }

    componentDidMount() {
        const BG_CONTENT = localStorage.getItem('bgContent');
        if(BG_CONTENT !== null) {
            this.setState({
                bg: {
                    ...this.state.bg,
                    color: BG_CONTENT,
                }
            })
        }
        const widgets = JSON.parse(localStorage.getItem('widgets'));
        const zCount = parseInt(localStorage.getItem('zCount'));
        if(widgets !== null) {
            this.setState({ widgets: widgets, zCount: !isNaN(zCount) ? zCount : 1 , loading: false, });
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

    removeWidget = (wId) => {
        console.log(wId)
        let tempWidgets = { ...this.state.widgets };
        delete tempWidgets[wId];
        this.setState({ 
            widgets: tempWidgets,
        }, () => {
            localStorage.removeItem(wId);
            localStorage.setItem('widgets', JSON.stringify(this.state.widgets))
        });
    }

    toggleModes = (setting, value) => {
        if(!['movable', 'addMode', 'deleteMode',].includes(setting)) return;
        if(value) {
            this.setState({
                [setting]: value
            })
        } else {
            this.setState((prevState) => ({
                [setting]: !prevState[setting]
            }))
        }
    }

    toggleSettings = () => {
        this.setState((prevState) => ({
            settingsExpanded: !prevState.settingsExpanded,
        }))
    }

    updateSettings = () => {
        const BG_CONTENT = localStorage.getItem('bgContent');
        if(BG_CONTENT !== null || BG_CONTENT === '') {
            this.setState({
                bg: {
                    ...this.state.bg,
                    color: BG_CONTENT ?? '#282c34',
                }
            })
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
                {this.state.loading 
                    ? <div>Loading...</div> 
                    : Object.keys(this.state.widgets).map(wId => {
                        const { type, q, z } = wList[wId];
                        return (
                            <Widget 
                                id={wId} 
                                z={z} 
                                type={type} 
                                q={q} 
                                movable={this.state.movable} 
                                deleteMode={this.state.deleteMode}
                                removeWidget={this.removeWidget}
                            />
                        )
                    })}
                <MenuBar 
                    movable={this.state.movable}
                    deleteMode={this.state.deleteMode}
                    addMode={this.state.addMode}
                    toggleModes={this.toggleModes} 
                    toggleSettings={this.toggleSettings}
                />
                <WidgetProvider value={this.addWidget}>
                    <AddWidgetPanel addMode={this.state.addMode} />
                </WidgetProvider>
                <Settings 
                    expanded={this.state.settingsExpanded} 
                    toggleSettings={this.toggleSettings}  
                    updateSettings={this.updateSettings}  
                />
            </div>
        )
    }
}

export default Dashboard;