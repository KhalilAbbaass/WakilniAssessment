import axios from 'axios';

export const soldItems = async (id) => {
    const apiURL =`/api/items/sold/${id}`
    return axios.put(apiURL)
};