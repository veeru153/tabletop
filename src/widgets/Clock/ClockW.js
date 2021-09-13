import React, { useState, useEffect } from 'react';
import Clock_Analog from './ClockW_Analog';
import Clock_Digital from './ClockW_Digital';

const Clock = (props) => {
    const { id, meta, content } = props;

    if(content.params.digital) return <Clock_Digital {...props} />
    return <Clock_Analog {...props} />
}

export default Clock;