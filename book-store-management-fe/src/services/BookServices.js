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
      `${BOOK_BASE_REST_API_URL}/by-categories/page/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return axios.get(
      `${BOOK_BASE_REST_API_URL}/by-categories/page/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getBooksByCategories(categoryIds) {
    return axios.get(`${BOOK_BASE_REST_API_URL}/by-categories/${categoryIds}`);
  }

  updateBookCover(formData) {
    return axios.post(BOOK_BASE_REST_API_URL + "/cover/upload", formData);
  }

  updateBookpdf(formData) {
    return axios.post(BOOK_BASE_REST_API_URL + "/pdf/upload", formData);
  }

  deleteBook(bookId) {
    return axios.delete(BOOK_BASE_REST_API_URL + "/delete/" + bookId);
  }

    getAllBooks(){
        return axios.get(BOOK_BASE_REST_API_URL);
    }
    getAllPublicBooks(){
        return axios.get(BOOK_BASE_REST_API_URL + "/public");
    }
    getSomeUnpublicBooks(){
        return axios.get(BOOK_BASE_REST_API_URL + "/someunpublic");
    }
    getBookById(id){
        return axios.get(BOOK_BASE_REST_API_URL+"/api/image/"+id);
    }
    getBookByUser(username){
        return axios.get(BOOK_BASE_REST_API_URL+"/by-user/"+username);
    }
    getPageBooks(pageNumber, pageSize){
        console.log(`${BOOK_BASE_REST_API_URL}/publicpage?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return axios.get(`${BOOK_BASE_REST_API_URL}/publicpage?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
    getPageBooksByCategories(categoryIds,pageNumber, pageSize){
        console.log(`${BOOK_BASE_REST_API_URL}/by-categories/publicpage/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return axios.get(`${BOOK_BASE_REST_API_URL}/by-categories/publicpage/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
    getBooksByCategories(categoryIds){
        return axios.get(`${BOOK_BASE_REST_API_URL}/by-categories/${categoryIds}`);
    }


    updateBookCover(formData){
        return axios.post(BOOK_BASE_REST_API_URL+"/cover/upload",formData)
    }

    updateBookpdf(formData){
        return axios.post(BOOK_BASE_REST_API_URL+"/pdf/upload",formData)
    }

    deleteBook(bookId){
        return axios.delete(BOOK_BASE_REST_API_URL+"/delete/"+bookId)
    }

    getUserOfBook(bookId){
        console.log(BOOK_BASE_REST_API_URL+"/find-by-user/" + bookId);
        return axios.get(BOOK_BASE_REST_API_URL+"/find-by-user/" + bookId);
    }
    filterBook(pageNumber, pageSize, searchText){
        console.log(`${BOOK_BASE_REST_API_URL}/search/${searchText}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return axios.get(`${BOOK_BASE_REST_API_URL}/search/${searchText}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
      getBookByBookId(bookId) {
    return axios.get(`${BOOK_BASE_REST_API_URL}/by-id/${bookId}`);

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
    return axios.post(BOOK_BASE_REST_API_URL + "/cover/update/"+id, formData);
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
    return axios.post(`${BOOK_BASE_REST_API_URL}/approve/${bookId}`);
  }

  deleteBook(bookId) {
    console.log("delete " + bookId);
    return axios.delete(`${BOOK_BASE_REST_API_URL}/delete/${bookId}`);
  }

  updateNewBookPdf(formData, id) {
    return axios.post(BOOK_BASE_REST_API_URL + "/pdf/update/" +id, formData);
  }

  getPublicBookByUser(username) {
    return axios.get(BOOK_BASE_REST_API_URL + "/public/by-user/" + username);
  }

  //phuong
  getPublicBookByUsernamePage( pageNumber, pageSize) {
    return api.get(`api/books/mypublic/page?pageNumber=${pageNumber}&pageSize=${pageSize}`);

    // return axios.get(`${BOOK_BASE_REST_API_URL}/public/page/${username}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  //phuong
  getUnPublicBookByUsernamePage( pageNumber, pageSize) {
    return api.get(`api/books/myunpublic/page?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    // return axios.get(`${BOOK_BASE_REST_API_URL}/unpublic/page/${username}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}

export default new BookService();
