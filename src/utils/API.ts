import axios from "axios";

const API = {
    getEmployees: () => {
        return axios.get("https://randomuser.me/api/?results=200&nat=us")
    }
}

export { API }