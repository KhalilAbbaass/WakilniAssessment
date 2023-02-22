import axios from 'axios';

export const getProducts = async () => {
    const apiURL = '/api/products/'
    return axios.get(apiURL)
};

