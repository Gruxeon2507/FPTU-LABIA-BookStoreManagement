import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:6789/api/users";

class UserServices{
    getAllUser(){
        return axios.get(USER_BASE_REST_API_URL);
    }
    getUserForSuperAdmin(){
        return axios.get(USER_BASE_REST_API_URL + '/superadmin');
    }

    getOnlyAdmin(){
        console.log(USER_BASE_REST_API_URL + '/onlyadmin');
        return axios.get(USER_BASE_REST_API_URL + '/onlyadmin');
    }

    getOnlyUser(){
        console.log(USER_BASE_REST_API_URL + '/onlyuser');
        return axios.get(USER_BASE_REST_API_URL + '/onlyuser');
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
    demoteUser(username){
        return axios.delete(USER_BASE_REST_API_URL + '/demote/' + username);
    }
    promoteAdmin(username){
        return axios.post(USER_BASE_REST_API_URL + '/promote/' + username);
    }
}

export default new UserServices();