import axios from 'axios';

export const getItems = async (id) => {
    const apiURL = `/api/items/${id}`
    return axios.get(apiURL)
};