import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:2000/allianceprofile",
    headers: {
        "Content-type": "application/json"
    }
});