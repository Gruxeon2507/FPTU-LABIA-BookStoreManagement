import axios from "axios";

const BOOK_BASE_REST_API_URL = "http://localhost:6789/api/books";

class BookService{
    getBook(){
        return axios.get(BOOK_BASE_REST_API_URL);
    }
    getBookByUser(username){
        return axios.get(BOOK_BASE_REST_API_URL+"/by-user/"+username);
    }

    getBookByBookId(id){
        return axios.get(BOOK_BASE_REST_API_URL + "/by-id/" + id);
    }
}

export default new BookService();