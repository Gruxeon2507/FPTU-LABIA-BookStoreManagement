import axios from "axios";
import { json } from "react-router";
import api from "./BaseAuthenticationServices";
const BOOK_BASE_REST_API_URL = "http://localhost:6789/api/books";

class BookService {
  getAllBooks() {
    return axios.get(BOOK_BASE_REST_API_URL);
  }
  getBookById(id) {
    return axios.get(BOOK_BASE_REST_API_URL + "/api/image/" + id);
  }
  getBookByUser(username) {
    return api.get("api/books/by-user");
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
      `${BOOK_BASE_REST_API_URL}/by-categories/publicpage/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return axios.get(
      `${BOOK_BASE_REST_API_URL}/by-categories/publicpage/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getBooksByCategories(categoryIds) {
    return axios.get(`${BOOK_BASE_REST_API_URL}/by-categories/${categoryIds}`);
  }

  updateBookCover(formData) {
    return api.post(BOOK_BASE_REST_API_URL + "/cover/upload", formData);
  }

  updateBookpdf(formData) {
    return api.post(BOOK_BASE_REST_API_URL + "/pdf/upload", formData);
  }

  deleteBook(bookId) {
    console.log("delete service called.");
    return api.delete(BOOK_BASE_REST_API_URL + "/delete/" + bookId);
  }

  getAllBooks() {
    return axios.get(BOOK_BASE_REST_API_URL);
  }
  getAllPublicBooks() {
    return axios.get(BOOK_BASE_REST_API_URL + "/public");
  }
  getSomeUnpublicBooks() {
    return axios.get(BOOK_BASE_REST_API_URL + "/someunpublic");
  }
  getUserOfBook(bookId) {
    console.log(BOOK_BASE_REST_API_URL + "/find-by-user/" + bookId);
    return axios.get(BOOK_BASE_REST_API_URL + "/find-by-user/" + bookId);
  }
  filterBook(pageNumber, pageSize, searchText) {
    console.log(
      `${BOOK_BASE_REST_API_URL}/search/${searchText}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return axios.get(
      `${BOOK_BASE_REST_API_URL}/search/${searchText}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getBookByBookId(bookId) {
    console.log(`${BOOK_BASE_REST_API_URL}/by-id/${bookId}`);
    return api.get(`/api/books/by-id/${bookId}`);
  }

  getABookById(id) {
    return axios.get(BOOK_BASE_REST_API_URL + "/by-id/" + id);
  }

  updateBook(id, book) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return api.post(
        "http://localhost:6789/api/books/update/" + id,
      JSON.stringify(book),
      config
    );
  }

  updateNewBookCover(formData, id) {
    return axios.post(BOOK_BASE_REST_API_URL + "/cover/update/" + id, formData);
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
    return axios.get(
      `${BOOK_BASE_REST_API_URL}/public/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getPublicBooks() {
    return axios.get(`${BOOK_BASE_REST_API_URL}/public`);
  }

  getPendingBooks() {
    return axios.get(`${BOOK_BASE_REST_API_URL}/pending`);
  }

  approveBook(bookId) {
    console.log("approve api called.");
    return api.post(`api/books/approve/${bookId}`);
  }

  updateNewBookPdf(formData, id) {
    return axios.post(BOOK_BASE_REST_API_URL + "/pdf/update/" + id, formData);
  }

  getPublicBookByUser(username) {
    return axios.get(BOOK_BASE_REST_API_URL + "/public/by-user/" + username);
  }

  //phuong
  getPublicBookByUsernamePage(pageNumber, pageSize) {
    return api.get(
      `api/books/mypublic/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    // return axios.get(`${BOOK_BASE_REST_API_URL}/public/page/${username}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  //phuong
  getUnPublicBookByUsernamePage(pageNumber, pageSize) {
    return api.get(
      `api/books/myunpublic/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    // return axios.get(`${BOOK_BASE_REST_API_URL}/unpublic/page/${username}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  deletePendingBook(bookId) {
    return api.delete(`api/books/delete/pending/${bookId}`);
  }
    //phuong
  getPublicBookOrderBy(field, pageNumber, pageSize) {
    const formData = new FormData();
    formData.append("field", field);
    formData.append("pageNumber", pageNumber);
    formData.append("pageSize", pageSize);
    return axios.post("http://localhost:6789/api/books/sort", formData);
    

  }
  // getPublicBookOrderBy(field, pageNumber, pageSize) {
  //   return axios.get(
  //     `/api/books/sort?field=${field}&pageNumber=${pageNumber}&pageSize=${pageSize}`
  //     // "/api/books/sort?field=price&pageNumber=0&pageSize=12"

  //   );
  // }
}

export default new BookService();
