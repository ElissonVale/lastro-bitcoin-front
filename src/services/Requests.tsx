import axios from "axios";
import env from "../../app.configs";

const API = axios.create({
    baseURL: env.API_URL,
    headers: {
        apiKey: env.API_KEY,
        Authorization: env.API_KEY
    }
});

const Request = {
    Post: (pointer: string, data: {} | undefined, callback: (data: any) => void) => {
        console.log(`Http post: ${env.API_URL}${pointer}`);
        
        return API.post(pointer, data)
        .then(response => { 
            callback(response.data);
        }).catch(error => console.log(error));
    },

    Get: (pointer: string, data: {} | undefined, callback: (data: any) => void) => {
        console.log(`http get: ${env.API_URL}${pointer}`);
        return API.get(pointer, data)
        .then(response => {
            callback(response.data);
        }).catch(error => console.log(error));
    }
}

export default Request;