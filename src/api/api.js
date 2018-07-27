import axios from 'axios';

const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://api.abalin.net/get';

export const getToday = () => {
    return axios.get(`${BASE_URL}/today`)
        .then(res => res.data.data);
};

export const getYesterday = () => {
    return axios.get(`${BASE_URL}/yesterday`)
        .then(res => res.data.data);
}

export const getTomorrow = () => {
    return axios.get(`${BASE_URL}/tomorrow`)
        .then(res => res.data.data);
}

export const getByDate = (day, month) => {
    return axios.get(`${BASE_URL}/namedays?day=${day}&month=${month}`)
        .then(res => res.data.data);
}