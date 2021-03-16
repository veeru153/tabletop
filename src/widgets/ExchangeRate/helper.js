import Axios from 'axios';
import { db, WIDGETS } from '../../util/db';

export const fetchRate = async (id, base, symbol) => {
    const prevData = await db.collection(WIDGETS).doc(id+"").get();

    try {
        const url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbol}`;
        const res = await Axios.get(url);
        const data = await res.data;

        const rate = data.rates[symbol];
        const date = data.date;
        const trend = 0;

        if(rate > prevData.rate) trend = 1;
        if(rate < prevData.rate) trend = -1;

        db.collection(WIDGETS).doc(id+"").update({ params: { rate, date, trend } });

        return { rate, date, trend };
    } catch (e) {
        return prevData;
    }
}

export const defaultData = {
    rate: 0,
    date: "Loading",
    trend: 0,
}