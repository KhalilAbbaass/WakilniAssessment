import axios from 'axios';

export const addProduct = async (productInfo) => {
    const apiURL = '/api/products/add'
    return axios.post(apiURL , productInfo)
};
