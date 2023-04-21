import axios from "axios";

const CATEGORY_BASE_REST_API_URL = "http://localhost:6789/api/categories";

class CategoryServices{
    getAllCategories(){
        return axios.get(CATEGORY_BASE_REST_API_URL);
    }

}

export default new CategoryServices();