import Axios from 'axios';
import { db, WIDGETS } from '../../util/db';
import { cookies, SECRETS } from '../../util/cookies';


export const fetchData = async (id, city, units) => {
    const { owmKey } = await cookies.get(SECRETS);
    if(!owmKey || !owmKey?.token) {
        errorW.weather[0].main = "Missing API Key";
        return errorW;
    }
    const OWM_KEY = owmKey?.token;
    if(navigator.onLine) {
        const api = `http://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(city)}&units=${units}&appid=${OWM_KEY}`;
        try {
            const res = await Axios.get(api);
            const data = await res.data.list[0];
            if(!data || data.length === 0) {
                errorW.name = "Error"
                errorW.weather[0].main = "No matching location found.";
                return errorW;
            }
            db.collection(WIDGETS).doc(id+"").update({ params: data });
            return data;
        } catch (e) {
            errorW.weather[0].main = e.message;
            return errorW;
        }
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