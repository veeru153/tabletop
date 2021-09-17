import localforage from 'localforage';

const _NAME = 'tabletop';
const _CONFIG = "config";
const _WIDGETS = "widgets";

const _DRIVER = localforage.INDEXEDDB;

export const WIDGETS = localforage.createInstance({
    name: _NAME,
    storeName: _WIDGETS,
    driver: _DRIVER,
})

export const CONFIG = localforage.createInstance({
    name: _NAME,
    storeName: _CONFIG,
    driver: _DRIVER,
})