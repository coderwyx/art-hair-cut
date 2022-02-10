const requestFn = require('./requestFn');

const API = {
    login: "/custom/find/001", //获取openid
};

const HTTP = {
    loginApi(params) {
        return requestFn.Request({
            url: API.login,
            method: 'GET',
            data: params
        })
    }
}

module.exports = HTTP;