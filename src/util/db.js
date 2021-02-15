import Localbase from 'localbase';
export const db = new Localbase('tabletop');

export const CONFIG = "config";
export const WIDGETS = "widgets";

export const config = db.collection(CONFIG);
export const widgets = db.collection(WIDGETS);