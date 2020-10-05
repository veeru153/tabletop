import Axios from 'axios';

const OWM_KEY = process.env.REACT_APP_OWM_KEY;

const fetchData = async (city) => {
    const api = `http://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(city)}&units=metric&appid=${OWM_KEY}`;
    const res = await Axios.get(api);
    const data = await res.data.list[0];
    let finalData = modifiedData(data);
    return finalData;
}

const modifiedData = (data) => {
    let tempData = { ...data };
    let tempW = { id: 0, main: "", description: "", icon: "" };
    const w = data.weather[0];

    if(w.id === 800) {
        if(w.icon.includes("n")) {
            tempW = { id: w.id, main: "clear", description: "Clear", icon: "clearD", bg: "clearD" }
        } else {
            tempW = { id: w.id, main: "clear", description: "Clear", icon: "clearN", bg: "clearN" }
        }
    } else if(w.id === 801 || w.id === 802) {
        if(w.icon.includes("d")) {
            tempW = { id: w.id, main: "pCloudy", description: "Partly Cloudy", icon: "pCloudyD", bg: "cloudD" }
        } else {
            tempW = { id: w.id, main: "pCloudy", description: "Partly Cloudy", icon: "pCloudyN", bg: "cloudN" }
        }
    } else if(w.id === 803 || w.id === 804) {
        if(w.icon.includes("d")) {
            tempW = { id: w.id, main: "mCloudy", description: "Cloudy", icon: "mCloudy", bg: "cloudD" }
        } else {
            tempW = { id: w.id, main: "mCloudy", description: "Cloudy", icon: "mCloudy", bg: "cloudN" }
        }
    } else if(w.id >= 200 && w.id < 300) {
        tempW = { id: w.id, main: "thunder", description: "Thunder Storm", icon: "thunder", bg: "rain" }
    } else if(w.id >= 300 && w.id < 400) {
        tempW = { id: w.id, main: "shower", description: "Showers", icon: "shower", bg: "rain" }
    } else if(w.id >= 500 && w.id < 600) {
        tempW = { id: w.id, main: "rain", description: "Rain", icon: "rain", bg: "rain" }
    } else if(w.id >= 600 && w.id < 700) {
        if(w.id === 611 || w.id === 612 || w.id === 613) {
            tempW = { id: w.id, main: "sleet", description: "Sleet", icon: "sleet", bg: "rain" }
        }
        tempW = { id: w.id, main: "snow", description: "Snow", icon: "snow", bg: "rain" }
    } else if(w.id >= 700 && w.id < 800) {
        if(w.id === 701 || w.id === 721) {
            if(w.icon.includes("n")) {
                tempW = { id: w.id, main: "clear", description: "Clear", icon: "clearN", bg: "clearN" }
            } else {
                tempW = { id: w.id, main: "clear", description: "Clear", icon: "clearD", bg: "clearD" }
            }
        } else if(w.id === 771 || w.id === 781) {
            tempW = { id: w.id, main: "atmosphere", description: w.description, icon: "atmosphere", bg: "cloudN" }
        } else {
            tempW = { id: w.id, main: w.main, description: w.description, icon: "fog", bg: "cloudN" }
        }
    }

    tempData.weather = [tempW];
    return tempData;
}

export { fetchData };