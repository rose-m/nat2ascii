/**
 * Transforms the given `text` so that it only contains pure ASCII characters.
 *
 * @param text {string} Text to transform
 * @return {string} Transformed string containing only ASCII characters
 */
function nativeToAscii(text) {
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

/**
 * Rewrites the given text so that all unicode escape sequences are replaced by their appropriate character.
 * @param text {string} Text to unescape
 * @return {string} Unescaped text with non-ASCII characters
 */
function asciiToNative(text) {
    return text.replace(/\\u[0-9a-f]{4}/ig, seq => {
        const num = seq.substr(2);
        return String.fromCharCode(parseInt(num, 16));
    });
}

exports.nativeToAscii = nativeToAscii;
exports.asciiToNative = asciiToNative;
