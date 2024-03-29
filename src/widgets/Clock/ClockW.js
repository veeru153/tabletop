import React from 'react';
import ClockAnalog from './ClockW_Analog';
import ClockDigital from './ClockW_Digital';

const Clock = (props) => {
    if(props.content.params.digital) return <ClockDigital {...props} />
    return <ClockAnalog {...props} />
}

export default Clock;