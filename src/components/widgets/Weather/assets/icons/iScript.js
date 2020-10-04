const fs = require('fs');

icons = fs.readdirSync('./');

icons.forEach(icon => {
    let name = icon.split('.')[0];
    let str = `import ${name} from './${icon}'`;
    console.log(str);
})