import axios from "axios"


const api = axios.create({
    baseURL: "//localhost:44320/api/"
})


export default api;