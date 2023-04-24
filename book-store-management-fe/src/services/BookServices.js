import axios from "axios";

const BOOK_BASE_REST_API_URL = "http://localhost:6789/api/books";

class BookService{
    getBook(){
        return axios.get(BOOK_BASE_REST_API_URL);
    }
    getBookByUser(username){
        return axios.get(BOOK_BASE_REST_API_URL+"/by-user/"+username);
    }

    getBookByBookId(bookId){
        console.log(BOOK_BASE_REST_API_URL + "/by-id/" + bookId);
        return axios.get(BOOK_BASE_REST_API_URL + "/by-id/" + bookId);
    }
}

export default new BookService();