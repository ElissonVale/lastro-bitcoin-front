import axios from "axios";
import Config from 'react-native-config'

const API = axios.create({
    baseURL: Config.API_URL,
    headers: {
        Authorization: Config.API_KEY
    }
});

const Request = {
    Post: (pointer: string, data: {} | undefined, callback: (data: any) => void) => {
        console.log(`Http post: ${Config.API_URL}`)
        API.post(pointer, data).then(callback).catch(error => console.log(error))
    },

    Get: (pointer: string, data: {} | undefined, callback: (data: any) => void) => {
        console.log(`http get: ${Config.API_URL}`)
        API.get(pointer, data).then(callback).catch(error => console.log(error))
    }
}

export default Request;