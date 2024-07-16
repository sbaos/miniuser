import axios from "./customizeAxios";

function fetchAllUsers(page) {
    return axios.get(`users?page=${page}`);
}

export default fetchAllUsers;