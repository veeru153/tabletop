import { atom, selectorFamily, DefaultValue, selector } from 'recoil';
import { WIDGETS } from '../util/db';


//TODO: ts errors. Idk how to ignore.
const localforageEffect = () => ({ resetSelf }) => {
    resetSelf(() => {
        WIDGETS.clear();
    })
}

export const widgetsAtom = atom({
    key: 'widgets',
    default: {},
    effects: [
        localforageEffect()
    ]
})

export const widgetSelector = selectorFamily({
    key: 'widget',
    get: (id) => ({ get }) => get(widgetsAtom)[id],
    set: (id) => ({ get, set }, contents) => {

        const w = { ...get(widgetsAtom) };

        if(contents == null) {
            delete w[id];
            WIDGETS.removeItem(id);
        } else {
            w[id] = contents;
            WIDGETS.setItem(id, contents);
        }

        set(widgetsAtom, w);
    },
})