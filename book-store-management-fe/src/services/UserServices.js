import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:6789/api/users";

class UserServices{
    getAllUser(){
        return axios.get(USER_BASE_REST_API_URL);
    }
    getOnlyAdmin(pageNumber, pageSize){
        console.log(`${USER_BASE_REST_API_URL}/onlyadmin?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return axios.get(`${USER_BASE_REST_API_URL}/onlyadmin?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    getOnlyUser(pageNumber, pageSize){
        console.log(`USER_BASE_REST_API_URL/onlyuser?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return axios.get(`${USER_BASE_REST_API_URL}/onlyuser?pageNumber=${pageNumber}&pageSize=${pageSize}`);
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


    registerUserAvatar(formData){
        return axios.post(USER_BASE_REST_API_URL+"/register/avatar/upload",formData)
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


    getUserByBookId(bookId){
        // console.log("calling")
        // console.log(axios.get(`${USER_BASE_REST_API_URL}/by-book/${bookId}`) + "hello");
        return axios.get(`${USER_BASE_REST_API_URL}/by-book/${bookId}`)
    }
    countUser(){
        return axios.get(USER_BASE_REST_API_URL+'/onlyuser/count');
    }
    countAdmin(){
        return axios.get(USER_BASE_REST_API_URL+'/onlyadmin/count');


    }
    exportUserToExcel(){
        return axios({
            url: USER_BASE_REST_API_URL + '/export',
            method: 'GET',
            responseType: 'blob'
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'users.xlsx');
            document.body.appendChild(link);
            link.click();
          });
    }
}

export default new UserServices();