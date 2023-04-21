import axios from "axios";

 const BOOK_BASE_REST_API_URL = "http://localhost:6789/api/books";

class BookService{
    getAllBooks(){
        return axios.get(BOOK_BASE_REST_API_URL);
    }
    getBookById(id){
        return axios.get(BOOK_BASE_REST_API_URL+"/api/image/"+id);
    }
    getBookByUser(username){
        return axios.get(BOOK_BASE_REST_API_URL+"/by-user/"+username);
    }
    getPageBooks(pageNumber, pageSize){
        console.log(`${BOOK_BASE_REST_API_URL}/page?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return axios.get(`${BOOK_BASE_REST_API_URL}/page?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
}

export default new BookService();


  