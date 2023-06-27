import axios from "axios";
import api from "./BaseAuthenticationServices";

const USER_BASE_REST_API_URL = "http://192.168.182.56:6789/api/users";

class UserServices {
  // getAllUser() {
  //   return axios.get(USER_BASE_REST_API_URL);
  // }
  getOnlyAdmin(pageNumber, pageSize) {
    return api.get(
      `api/users/onlyadmin?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getOnlyUser(pageNumber, pageSize) {
    // console.log("getOnlyUser service called.");
    return api.get(
      `api/users/onlyuser?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getUserByUserName(id) {
    return axios.get(USER_BASE_REST_API_URL + "/" + id);
  }

  checkUserName(id) {
    return axios.get(USER_BASE_REST_API_URL + "/check/" + id);
  }
  updateUserInformation(User) {
    // return axios.post(USER_BASE_REST_API_URL + "/update", User);
    api.post("/api/users/update-profile", User);
  }
  updateUserAvatar(formData) {
    return api.post(USER_BASE_REST_API_URL + "/avatar/upload", formData);
  }

  registerUserAvatar(formData) {
    return axios.post(
      USER_BASE_REST_API_URL + "/register/avatar/upload",
      formData
    );
  }

  deleteUser(username) {
    const formData = new FormData();
    formData.append("username", username);
    return api.post("api/users", formData);
  }
  demoteUser(username) {
    const formData = new FormData();
    formData.append("username", username);
    return api.post("api/users/demote", formData);
  }
  promoteAdmin(username) {
    const formData = new FormData();
    formData.append("username", username);
    return api.post("api/users/promote", formData);
  }

  getUserByBookId(bookId) {
    // console.log("calling")
    // console.log(axios.get(`${USER_BASE_REST_API_URL}/by-book/${bookId}`) + "hello");
    return axios.get(`${USER_BASE_REST_API_URL}/by-book/${bookId}`);
  }
  countUser() {
    return axios.get(USER_BASE_REST_API_URL + "/onlyuser/count");
  }
  countAdmin() {
    return axios.get(USER_BASE_REST_API_URL + "/onlyadmin/count");
  }
  exportUserToExcel() {

    return api({
      url: "api/users/export",
      method: "GET",
      responseType: "blob"
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.xlsx");
      document.body.appendChild(link);
      link.click();
    });
  }
}

export default new UserServices();
