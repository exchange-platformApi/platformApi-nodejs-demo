const crypto = require("crypto");

/**
 * Calculate OpenPlatform signature
 * @param data request data，for calculate sign
 * @param secret appSecret for OpenPlatform
 * @returns {string}
 */
function getSign(data, secret) {
    let keys = data.keys();
    let keysArr = Array.from(keys);
    keysArr.sort();

    let arr = []
    for (let key of keysArr) {
        arr.push(key)
        arr.push(data.get(key))
    }
    arr.push(secret)
    let hash = arr.join("");
    console.log(hash)
    let signature = crypto.createHash('md5').update(hash).digest('hex');
    console.log(signature)
    return signature;
}

/**
 * Get the get request parameter string
 * @param q request parameter，json object
 * @returns {string} appKey=test&code=123
 */
function makeQueryString(q) {
    return Object.keys(q)
        .reduce((a, k) => {
            if (Array.isArray(q[k])) {
                q[k].forEach(v => {
                    a.push(k + "=" + encodeURIComponent(v))
                })
            } else if (q[k] !== undefined) {
                a.push(k + "=" + encodeURIComponent(q[k]));
            }
            return a;
        }, [])
        .join("&");
}

module.exports = {
    getSign
}
