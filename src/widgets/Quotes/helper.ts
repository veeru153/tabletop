import Axios from 'axios';
import { WIDGETS } from '../../common/util/db';

class QuoteException {
    name = "Error";
    message = "Error";

    constructor(message: string) {
        this.message = message;
    }
}

export const fetchData = async (id: string, params: { tags: string, }) => {
    const { tags } = params;
    const MAX_LEN = 50;
    const TAGS = tags && tags.length > 0 ? `&tags=${tags}` : "" ;

    const api = `https://api.quotable.io/random?maxLength=${MAX_LEN}&${TAGS}`;

    if(navigator.onLine) {
        try {
            const res = await Axios.get(api);
            const data = await res.data;
            const { content, author } = data;

            const qData = await WIDGETS.getItem(id);
            qData.content = { data, params };
            await WIDGETS.setItem(id, qData);

            return { content, author };
        } catch (e) {
            console.error(e);
            throw new QuoteException("404 - Quote Not Found. Check tags.");
        }
    } else {
        const savedQ = await WIDGETS.getItem(id);
        if(!savedQ) throw new QuoteException("You are Offline.");
        return savedQ.content.data;
    }
}

export const defaultQ = {
    content: "Loading...",
    author: "Loading...",
}