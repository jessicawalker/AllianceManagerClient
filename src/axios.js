import axios from "axios";

export default axios.create({
    //baseURL: "http://localhost:2000/",
    baseURL: "https://alliance-manager.herokuapp.com/",
    headers: {
        "Content-type": "application/json"
    }
});