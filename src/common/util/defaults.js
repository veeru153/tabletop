const colors = ["#e27d60", "#c38d93", "#282c34", "#41b3a3", "#e8a87c", "#bc986a", "#8d8741", ]
const randomColor = colors[Math.floor(Math.random() * colors.length)];

export const BG = {
    type: 0,            // 0 = Color, 1 = Image, 2 = Video
    color: randomColor,
    image: '',       // base64 - <String>
    localImg: '',
    blend: { color: '#000000', mode: 'normal' },
    filter: { fn: 'none', value: 0 }
}

export const IMAGESRCS = { 0: [] };
export const VIDEOSRCS = { 0: [] };

export const META = {
    version: 1,
    compatibility: 1,
    showZeroWidgetMsg: true,
    showCoverOnStart: true,
    allowWidgetReposWithoutEdit: false,
}