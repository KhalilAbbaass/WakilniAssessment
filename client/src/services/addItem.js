import axios from 'axios';

export const addItem = async (id , newItemInfo) => {
    const apiURL = `/api/items/add/${id}`
    return axios.post(apiURL , newItemInfo)
};