import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:9999/api/users";

class BookService{
    getALlUser(){
        return axios.get(USER_BASE_REST_API_URL);
    }
    getUserByUserName(id){
        return axios.get(USER_BASE_REST_API_URL+"/"+id);
    }
}

export default new BookService();