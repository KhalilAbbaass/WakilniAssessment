import axios from 'axios';

export const deleteitem = async (id) => {
    const apiURL = `/api/items/delete/${id}`;
    return axios.delete(apiURL)
};
