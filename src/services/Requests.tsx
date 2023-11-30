import axios from "axios";
import env from "../../app.configs";
import * as SecureStorage from 'expo-secure-store'

const axiosCreateInstance = async () => { 
    const publicKey = await SecureStorage.getItemAsync("publicKey");
    const userId = await SecureStorage.getItemAsync("publicKey");

    return axios.create({
        baseURL: env.API_URL,
        headers: {
            "user-id": userId,
            "api-key": env.API_KEY,
            Authorization: publicKey            
        }
    });
}

const Request = {
    Post: async (pointer: string, data: {} | undefined, callback: (data: any) => void) => {
        
        console.log(`Http post: ${env.API_URL}${pointer}`);

        const axiosInstance = await axiosCreateInstance(); 

        const response = await axiosInstance.post(pointer, data);

        if(response.status == 200)
            callback(response.data);
    },

    Get: async (pointer: string, data: {} | undefined, callback: (data: any) => void) => {

        console.log(`http get: ${env.API_URL}${pointer}`);

        const axiosInstance = await axiosCreateInstance();
        
        const response = await axiosInstance.get(pointer, data);
        
        if(response.status == 200)
            callback(response.data);
    }
}

export default Request;