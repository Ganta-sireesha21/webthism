import axios from "axios";

const API = axios.create({
    baseURL: "https://webthism.onrender.com",
});

export default API;