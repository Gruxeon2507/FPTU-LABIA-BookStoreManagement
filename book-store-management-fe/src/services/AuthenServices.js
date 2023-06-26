import axios from "axios";

const AUTHEN_BASE_REST_API_URL = "http://103.173.229.92:6789/api/auth";
class AuthenServices{
    getSessionUser(sessionId){
        console.log(axios.get(AUTHEN_BASE_REST_API_URL+"/checkSession"))
        return axios.get(AUTHEN_BASE_REST_API_URL+"/checkSession",sessionId)
    }
}
export default new AuthenServices();