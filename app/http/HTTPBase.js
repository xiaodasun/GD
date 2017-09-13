
let HTTPBase = {};

/*
*
* GET 请求
*
* @param url
* @param params {}
* @param headers
*
* return {Promise}
*
* */

HTTPBase.get = function(url, params, headers) {
    if(params) {
        let paramsArray=  [];

        // 获取params对象中所有的key
        let paramsKeyArray = Object.keys(params);

        // 通过 forEach 方法拿到 paramsKeyArray 数组中所有的 key，并与 params 中的值进行拼接，传到 paramsArray 中
        paramsKeyArray.forEach((key) => {paramsArray.push(key + '=' + params[key])});

        // 网址拼接
        if(url.search('/\?/')){ //.search()中是正则表达式
            url += '?' + paramsArray.join('&')  //用问号 ? 及 & 拼接成的url
        } else {
            url += paramsArray.join('&');
        }
    }
    return (
        new Promise(function(resolve, reject){
            fetch(url, {
                method: 'GET',
                headers: headers,
            })
                .then((response) => response.json())
                .then((responseData) => resolve(responseData))
                .catch((error) => reject({status: -1}))
        })
    )
};

HTTPBase.post = function(url, params, headers) {
    if(params){
        var formData = new FormData();
        let paramsKeyArray = Object.keys(params);
        paramsKeyArray.forEach((key) => formData.append(key, params[key]));
    }

    return new Promise(function(resolve, reject) {
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: formData,
            })
                .then((response) => response.json())
                .then((responseData) => resolve(responseData))
                .catch((error) => reject({status: -1}))
                .done()
        })
}


module.exports = HTTPBase;