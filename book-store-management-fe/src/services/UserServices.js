import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:9999/api/users";

class UserServices{
    getALlUser(){
        return axios.get(USER_BASE_REST_API_URL);
    }
    getUserByUserName(id){
        return axios.get(USER_BASE_REST_API_URL+"/"+id);
    }
    updateUserInformation(User){
        return axios.post(USER_BASE_REST_API_URL+"/update",User);
    }
}

export default new UserServices();