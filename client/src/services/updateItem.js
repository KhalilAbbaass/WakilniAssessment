import axios from 'axios';

export const updateItem = async ( itemInfo , id) => {
    const apiURL =`/api/items/update/${id}`
    return axios.put(apiURL , itemInfo)
};
