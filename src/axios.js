import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:2000/",
    headers: {
        "Content-type": "application/json"
    }
});