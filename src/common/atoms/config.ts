import { atom, selector, DefaultValue } from 'recoil';
import { CONFIG } from '../util/db';
import * as DEFAULTS from '../util/defaults';

//TODO: ts errors. Idk how to ignore.
const localforageEffect = (key: string) => ({ setSelf, onSet }) => {
    setSelf(CONFIG.getItem(key).then((prev: any) => {
        return (prev != null) ? { ...DefaultValue, ...prev } : DefaultValue
    }));

    onSet((newVal, _, isReset) => {
        isReset ? CONFIG.removeItem(key) : CONFIG.setItem(key, newVal);
    })
}

export const bgAtom = atom({
    key: 'bg',
    default: DEFAULTS.BG,
    effects: [
        localforageEffect('bg'),
    ],
});

export const metaAtom = atom({
    key: 'meta',
    default: DEFAULTS.META,
    effects: [
        localforageEffect('meta'),
    ]
})

const imageSrcsAtom = atom({
    key: '_imageSrcs',
    default: DEFAULTS.IMAGESRCS,
    effects: [
        localforageEffect('imageSrcs'),
    ]
})

export const imageSrcsSelector = selector({
    key: 'imageSrcs',
    get: ({ get }) => (get(imageSrcsAtom)[0]),
    set: ({ set }, sources) => (set(imageSrcsAtom, { 0: [...sources as []] }))
})

export const videoSrcsAtom = atom({
    key: '_videoSrcs',
    default: DEFAULTS.VIDEOSRCS,
    effects: [
        localforageEffect('videoSrcs'),
    ]
})

export const videoSrcsSelector = selector({
    key: 'videoSrcs',
    get: ({ get }) => (get(videoSrcsAtom)[0]),
    set: ({ set }, sources) => (set(videoSrcsAtom, { 0: [...sources as []] }))
})

// export const config = 