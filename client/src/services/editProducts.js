import axios from 'axios';

export const editProducts = async (productInfo , id) => {
    const apiURL =`/api/products/update/${id}`
    return axios.put(apiURL , productInfo)
};
