import Axios from 'axios';

const api = "https://api.covid19india.org/v4/data.json";

const initState = {
    "delta": {
        "confirmed": 0,
        "deceased": 0,
        "recovered": 0,
        "tested": 0
    },
    "meta": {
        "population": 0,
        "tested": {
            "last_updated": "Loading",
        }
    },
    "total": {
        "confirmed": "Loading",
        "deceased": "Loading",
        "recovered": "Loading",
        "tested": "Loading"
    }
}

const states = {
    "Andaman & Nicobar Islands": "AN",
    "Andhra Pradesh": "AP",
    "Arunachal Pradesh": "AR",
    "Assam": "AS",
    "Bihar": "BR",
    "Chandigarh": "CH",
    "Chhatisgarh": "CT",
    "Delhi": "DL",
    "Dadra & Nagar Haveli / Daman & Diu ": "DN",
    "Goa": "GA",
    "Gujarat": "GJ",
    "Himachal Pradesh": "HP",
    "Haryana": "HR",
    "Jharkhand": "JH",
    "Jammu & Kashmir": "JK",
    "Karnataka": "KA",
    "Kerala": "KL",
    "Ladakh": "LA",
    "Maharashtra": "MH",
    "Meghalaya": "ML",
    "Manipur": "MN",
    "Madhya Pradesh": "MP",
    "Mizoram": "MZ",
    "Nagaland": "NL",
    "Odisha": "OR",
    "Punhab": "PB",
    "Puducherry": "PY",
    "Rajasthan": "RJ",
    "Sikkim": "SK",
    "Telangana": "TG",
    "Tamil Nadu": "TN",
    "Tripura": "TR",
    "India": "TT",
    "Uttar Pradesh": "UP",
    "Uttrakhand": "UT",
    "West Bengal": "WB",
}

const fetchData = async (state, district) => {
    const res = await Axios.get(api);
    const data = await res.data;

    if(district === null || district === "India") {
        return data[state];
    }

    return data[state].districts[district];
}



export { fetchData, initState };