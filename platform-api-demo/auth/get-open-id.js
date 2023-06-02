const request = require('request');
const util = require("../util/util.js");

function getOpenId() {
    let method = "POST";

    // set the domain url for calling OpenPlatform
    let url = "https://service.xxx.com/platformapi/chainup/open/auth/token";

    // set the appKey/appSecret
    let appKey = "";
    let appSecret = "";

    // set the parameters of the getOpenId interface
    let code = "";

    let paramsMap = new Map();
    paramsMap.set("appKey", appKey);
    paramsMap.set("code", code);

    // calculate the signature
    let sign = util.getSign(paramsMap, appSecret);

    paramsMap.set("sign", sign);

    let dataJsonStr = JSON.stringify(paramsMap);

    let options = {
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        body: dataJsonStr
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}

getOpenId();
