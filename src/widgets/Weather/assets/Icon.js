import React from 'react';
import clearD from './clearD.webp';
import clearN from './clearN.png';
import fog from './fog.webp';
import mcloudy from './mcloudy.webp';
import pcloudyD from './pcloudyD.webp';
import pcloudyN from './pcloudyN.webp';
import rain from './rain.webp';
import shower from './shower.webp';
import sleet from './sleet.webp';
import snow from './snow.webp';
import thunder from './thunder.webp';
import atmosphere from './atmosphere.webp';

const icons = {
    'clearD': clearD,
    'clearN': clearN,
    'fog': fog,
    'mCloudy': mcloudy,
    'pCloudyD': pcloudyD,
    'pCloudyN': pcloudyN,
    'rain': rain,
    'shower': shower,
    'sleet': sleet,
    'snow': snow,
    'thunder': thunder,
    'atmosphere': atmosphere,
}

const Icon = (props) => {
    const { name, size } = props;
    const styles = {
        width: size ?? 44,
        height: size ?? 44,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <div style={styles}>
            <img src={icons[name]} style={{ width: '100%', height: '100%'}} alt={icons[name]}/>
        </div>
    )
}

export default Icon;