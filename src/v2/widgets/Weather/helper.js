import Axios from 'axios';
import { WIDGETS } from '../../common/util/db';
import { cookies, SECRETS } from '../../common/util/cookies';

class WeatherException {
    name = "Error";
    message = "Error";
    icon = "50n";

    constructor(message) {
        this.message = message;
    }
}

export const fetchData = async (id, params) => {
    const { units, city } = params;
    const { owmKey } = await cookies.get(SECRETS);

    if(!owmKey && owmKey.token.length == 0) {
        throw new WeatherException("Missing API Key");
    }

    const OWM_KEY = owmKey?.token;

    const api = `http://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(city)}&units=${units}&appid=${OWM_KEY}`;

    if(navigator.onLine) {
        try {
            const res = await Axios.get(api);
            const data = await res.data.list[0];

            if(!data || data.length === 0) {
                throw new WeatherException("Location Not Found");
            }

            const wData = await WIDGETS.getItem(id);
            wData.content = { data, params };
            await WIDGETS.setItem(id, wData);
            return data;
        } catch (e) {
            throw new WeatherException("Check API Key");
        }
    } else {
        try {
            const savedW = await WIDGETS.getItem(id);
            return savedW.content.data;
        } catch (e) {
            throw new WeatherException("Offline")
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