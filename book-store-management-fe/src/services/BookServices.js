import axios from "axios";

const BOOK_API_BASE_URL = "http://localhost:9999/api/book";

class BookService{
    getBook(){
        return axios.get(BOOK_API_BASE_URL);
    }
    getBookById(id){
        return axios.get(BOOK_API_BASE_URL+"/api/image/"+id);
    }
}

export default new BookService();