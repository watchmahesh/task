
const crypto = require('crypto');


function generateRandomString(stringLength) {
    let randomString = '';
    let asciiLow = 65;
    let asciiHigh = 90;

    for (let i = 0; i < stringLength; i++) {
        let randomAscii = Math.floor((Math.random() * (asciiHigh - asciiLow)) + asciiLow);
        randomString += String.fromCharCode(randomAscii);
    }

    let randomData= randomString + crypto.randomBytes(10).toString("hex");

    return randomData.toLowerCase();

}
module.exports = {
    generateRandomString,
};