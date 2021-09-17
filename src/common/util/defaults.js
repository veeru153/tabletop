export const BG = {
    type: 0,            // 0 = Color, 1 = Image, 2 = Video
    color: '#282c34',
    image: '',       // base64 - <String>
    localImg: '',
    blend: { color: '#000000', mode: 'normal' },
    filter: { fn: 'none', value: 0 }
}

export const IMAGESRCS = { 0: [] };
export const VIDEOSRCS = { 0: [] };

export const META = {
    version: 1,
    compatiblilty: 1,
    showZeroWidgetMsg: true,
    showCoverOnStart: true,
    allowWidgetReposWithoutEdit: false,
}