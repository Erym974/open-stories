import realAxios from 'axios'

const axios = realAxios.create({
    baseURL: process.env.BASE_URL,
});

axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.log(error);
    console.log({ status: false, data: error});
});

module.exports = axios;