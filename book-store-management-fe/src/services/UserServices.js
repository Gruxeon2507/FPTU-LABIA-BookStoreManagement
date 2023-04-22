import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:6789/api/users";

class UserServices{
    getAllUser(){
        return axios.get(USER_BASE_REST_API_URL);
    }
    getUserForSuperAdmin(){
        return axios.get(USER_BASE_REST_API_URL + '/superadmin');
    }
    getUserByUserName(id){
        return axios.get(USER_BASE_REST_API_URL+"/"+id);
    }
    updateUserInformation(User){
        return axios.post(USER_BASE_REST_API_URL+"/update",User);
    }   
    updateUserAvatar(formData){
        return axios.post(USER_BASE_REST_API_URL+"/avatar/upload",formData)
    }

    deleteUser(username){
        return axios.delete(USER_BASE_REST_API_URL + '/' + username);
    }
}

export default new UserServices();