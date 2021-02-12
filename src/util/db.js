import Localbase from 'localbase';
let db = new Localbase('db');

const CONFIG = "tabletop_config";
const WIDGETS = "tabletop_widgets";

export const config = db.collection(CONFIG);
export const widgets = db.collection(WIDGETS);

export default db;