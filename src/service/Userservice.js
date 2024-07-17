import axios from "./customizeAxios";

const fetchAllUsers = (page) =>{
    return axios.get(`/users?page=${page}`);
}

const postCreateUser = (name,job) =>{
    return axios.post("/users",{"name": name,"job": job});
}

const putUpdateUser = (name,job,id) =>{
    return axios.put(`/users/${id}`,{"name": name,"job": job});

}
const deleteUser = (id) =>{
    return axios.delete(`/users/${id}`);

}
export {fetchAllUsers,postCreateUser,putUpdateUser,deleteUser};