import Localbase from 'localbase';
export const db = new Localbase('tabletop');

db.config.debug = false;

export const CONFIG = "config";
export const WIDGETS = "widgets";

// No idea why these don't work :/
// export const config = db.collection(CONFIG);
// export const widgets = db.collection(WIDGETS);