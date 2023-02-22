import axios from 'axios';

export const deleteProducts = async (id) => {
    const apiURL = `/api/products/delete/${id}`;
    return axios.delete(apiURL)
};
