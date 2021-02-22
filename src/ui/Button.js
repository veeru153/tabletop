import React from 'react';

const Button = (props) => {
    return (
        <button {...props} style={{...styles.btn, ...props.style}}>
            {props.children}
        </button>
    )
}

const styles = {
    btn: {
        fontSize: '24px',
        padding: '12px 24px',
    }
}

export default Button;