import Axios from 'axios';

const OWM_KEY = process.env.REACT_APP_OWM_KEY;

export const fetchData = async (city) => {
    const api = `http://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(city)}&units=metric&appid=${OWM_KEY}`;
    const res = await Axios.get(api);
    const data = await res.data.list[0];
    // let finalData = modifiedData(data);
    return data;
}
