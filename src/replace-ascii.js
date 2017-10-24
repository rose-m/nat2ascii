#!/usr/bin/env node

function transformNonAscii(text) {
    const output = [];
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const code = char.charCodeAt(0);
        if (code < 128) {
            output.push(char);
        } else {
            let repr = code.toString(16).toUpperCase();
            while (repr.length < 4) {
                repr = `0${repr}`;
            }
            output.push(`\\u${repr}`);
        }
    }
    return output.join('');
}

if (require.main === module) {
    if (process.argv.length < 3) {
        console.error('Missing filename - usage:');
        console.error(`    >> ${process.argv[1]} <filename>`);
        return;
    }

    const fs = require('fs');
    const os = require('os');

    const filename = process.argv[2];
    const fileContents = fs.readFileSync(filename, { encoding: 'UTF8' });
    
    const result = fileContents
        .split(os.EOL)
        .map(transformNonAscii)
        .join(os.EOL);

    fs.writeFileSync(filename, result);
    console.log(`>> Transformed ${filename}`);
}