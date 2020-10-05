import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styles from './StickyNote.module.css';
import cuid from 'cuid';
import bg from './assets/background';

class StickyNote extends Component {
    s = this.props.savedState;
    state = {
        id: this.s?.id ?? `sticky_${cuid()}`,
        pos: this.s?.pos ?? { x: 0, y: 0 },
        z: this.props.z,
        color: this.s?.color ?? 'yellow',
        text: this.s?.text ?? '',
    }

    handleReposition(data) {
        this.setState({ 
            pos: { x: data.x, y: data.y } 
        }, () => localStorage.setItem(this.state.id, JSON.stringify(this.state)));
    }

    textUpdateHandler(e) {
        let currText = e.target.value;
        this.setState({
            text: currText
        }, () => localStorage.setItem(this.state.id, JSON.stringify(this.state)));
    }

    render() {
        const myStyle = {
            backgroundImage: `url(${bg[this.state.color]})`,
            zIndex: this.state.z,
        }

        return (
            <Draggable
                bounds="body"
                position={this.state.pos}
                onStop={(e, data) => this.handleReposition(data)}
            >
                <div className={styles.StickyNote} style={myStyle}>
                    <textarea 
                        data-gramm="false" 
                        onChange={(e) => this.textUpdateHandler(e)}
                        onKeyDown={(e) => this.textUpdateHandler(e)}
                        value={this.state.text}
                    ></textarea>
                </div>
            </Draggable>
        )
    }
}

export default StickyNote;