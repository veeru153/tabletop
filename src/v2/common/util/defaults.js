// export const BG = {
//     usingImg: false,
//     localImg: true,
//     image: null,        // Last local image used
//     blend: {
//         color: '#000000',
//         mode: 'normal',
//     },
//     filter: {
//         fn: 'none',
//         value: '0'
//     },
//     color: '#282c34',   // Default,
// }

export const BG = {
    type: 0,            // 0 = Color, 1 = Image, 2 = Video
    color: '#282c34',
    localImg: '',       // base64 - <String>
    blend: { color: '#000000', mode: 'normal' },
    filter: { fn: 'none', value: 0 }
}