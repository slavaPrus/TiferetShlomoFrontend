import axios from "axios"


const api = axios.create({
    baseURL: "https://localhost:7071/api/"
})


export default api;
