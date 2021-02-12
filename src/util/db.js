import Localbase from 'localbase';

let db = new Localbase('db');

export const config = db.collection('config');
export const widgets = db.collection('widgets');

export default db;