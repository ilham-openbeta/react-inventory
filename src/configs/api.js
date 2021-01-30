const axios = require('axios')

axios.interceptors.response.use(response => {
    if (response.status != 200) {
        throw new Error(response.statusText)
    }
    let data = response.data
    if (response.data.code != 200) {
        throw new Error(data.message)
    }
    return data.data;
}, function (error) {
    return Promise.reject(error);
});

axios.defaults.timeout = 2000;

export default axios