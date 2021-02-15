import Localbase from 'localbase';
export let db = new Localbase('db');

export const CONFIG = "tabletop_config";
export const WIDGETS = "tabletop_widgets";

export const config = db.collection(CONFIG);
export const widgets = db.collection(WIDGETS);