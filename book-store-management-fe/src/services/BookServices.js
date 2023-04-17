import axios from "axios";

const BOOK_BASE_REST_API_URL = "http://localhost:9999/api/books";

class BookService{
    getBook(){
        return axios.get(BOOK_BASE_REST_API_URL);
    }
    getBookById(id){
        return axios.get(BOOK_BASE_REST_API_URL+"/api/image/"+id);
    }
}

export default new BookService();