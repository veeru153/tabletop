import Axios from 'axios';


export const defaultW = {
    clouds: { all: 0 },
    coord: { lat: 0, lon: 0 },
    dt: 0,
    id: 0,
    main: {
        temp: 0, 
        feels_like: 0, 
        temp_min: 0, 
        temp_max: 0, 
        humidity: 0,
        pressure: 0
    },
    name: "Loading...",
    rain: null,
    snow: null,
    sys: { country: "Loading..." },
    weather: [{ id: 701, main: "Loading...", description: "Loading...", icon: "50n" }],
    wind: { speed: 0, deg: 0 },
}

const errorW = {
    ...defaultW,
    name: "Error",
    weather: [{ id: 701, main: "An Error Occured", description: "Error", icon: "50n" }]
}