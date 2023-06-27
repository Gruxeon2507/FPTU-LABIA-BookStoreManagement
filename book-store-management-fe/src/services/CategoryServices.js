import axios from "axios";
const BOOK_BASE_REST_API_URL = "http://192.168.182.56:6789/api/categories";

class CategoryServices {
  getAllCategories() {
    return axios.get(BOOK_BASE_REST_API_URL);
  }

  getCategoryByBook(bookId) {
    return axios.get(BOOK_BASE_REST_API_URL + "/by-book/" + bookId);
  }
}

export default new CategoryServices();
