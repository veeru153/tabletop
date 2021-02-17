import Axios from 'axios';
import { db, WIDGETS } from '../../util/db';

const OWM_KEY = process.env.REACT_APP_OWM_KEY;

export const fetchData = async (id, city) => {
    if(navigator.onLine) {
        const api = `http://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(city)}&units=metric&appid=${OWM_KEY}`;
        const res = await Axios.get(api);
        const data = await res.data.list[0];
        db.collection(WIDGETS).doc(id+"").update({ params: data });
        return data;
    } else {
        try {
            const savedW = await db.collection(WIDGETS).doc(id+"").get();
            return savedW.params;
        } catch (e) {
            errorW.weather[0].description = e;
            return errorW;
        }
    }
}

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