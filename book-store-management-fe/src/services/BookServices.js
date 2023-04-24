import axios from "axios";

 const BOOK_BASE_REST_API_URL = "http://localhost:6789/api/books";

class BookService{
    getAllBooks(){
        return axios.get(BOOK_BASE_REST_API_URL);
    }
    getAllPublicBooks(){
        return axios.get(BOOK_BASE_REST_API_URL + "/public");
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
}

export default new BookService();


  