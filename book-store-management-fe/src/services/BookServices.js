import axios from "axios";

const BOOK_BASE_REST_API_URL = "http://localhost:6789/api/books";

class BookService {
  getAllBooks() {
    return axios.get(BOOK_BASE_REST_API_URL);
  }
  getBookByUser(username) {
    return axios.get(BOOK_BASE_REST_API_URL + "/by-user/" + username);
  }
  getPageBooks(pageNumber, pageSize) {
    console.log(
      `${BOOK_BASE_REST_API_URL}/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return axios.get(
      `${BOOK_BASE_REST_API_URL}/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getPageBooksByCategories(categoryIds, pageNumber, pageSize) {
    console.log(
      `${BOOK_BASE_REST_API_URL}/by-categories/page/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return axios.get(
      `${BOOK_BASE_REST_API_URL}/by-categories/page/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getBooksByCategories(categoryIds) {
    return axios.get(`${BOOK_BASE_REST_API_URL}/by-categories/${categoryIds}`);
  }

  getBookByBookId(bookId) {
    return axios.get(`${BOOK_BASE_REST_API_URL}/by-id/${bookId}`);
  }

  getPagePendingBooks(pageNumber, pageSize) {
    // console.log(
    //   `${BOOK_BASE_REST_API_URL}/pending/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
    // );
    return axios.get(
      `${BOOK_BASE_REST_API_URL}/pending/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getPagePublicBooks(pageNumber, pageSize) {
    // console.log(
    //   `${BOOK_BASE_REST_API_URL}/public/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
    // );
    return axios.get(
      `${BOOK_BASE_REST_API_URL}/public/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getPublicBooks() {
    // console.log(
    //   `${BOOK_BASE_REST_API_URL}/public`
    // );
    return axios.get(`${BOOK_BASE_REST_API_URL}/public`);
  }

  getPendingBooks() {
    // console.log(
    //   `${BOOK_BASE_REST_API_URL}/pending`
    // );
    return axios.get(`${BOOK_BASE_REST_API_URL}/pending`);
  }

  approveBook(bookId) {
    return axios.post(`${BOOK_BASE_REST_API_URL}/approve/${bookId}`);
  }

  deleteBook(bookId) {
    console.log("delete " + bookId);
    return axios.delete(`${BOOK_BASE_REST_API_URL}/delete/${bookId}`);
  }
}

export default new BookService();
