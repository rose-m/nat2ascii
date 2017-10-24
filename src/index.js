#!/usr/bin/env node

const transforms = require('./transforms');

if (require.main === module) {
    if (process.argv.length < 3) {
        console.error('Missing filename - usage:');
        console.error(`    >> ${process.argv[1]} <filename> [-i|--inverse]`);
        return;
    }

    const fs = require('fs');
    const os = require('os');

    const filename = process.argv[2];
    const fileContents = fs.readFileSync(filename, {encoding: 'UTF8'});

    let transform = transforms.nativeToAscii;
    if (process.argv.length > 3 && (process.argv[3] === '-i' || process.argv[3] === '--inverse')) {
        transform = transforms.asciiToNative;
    }

    const result = fileContents
        .split(os.EOL)
        .map(transform)
        .join(os.EOL);

    fs.writeFileSync(filename, result);
    console.log(`>> Transformed ${filename}`);
}

exports.nativeToAscii = transforms.nativeToAscii;
exports.asciiToNative = transforms.asciiToNative;
