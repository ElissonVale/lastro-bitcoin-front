import axios from "axios";
import env from "../../app.configs";
import * as SecureStorage from 'expo-secure-store'

type PropsPairKey = {
    publicKey: string | null | undefined,
    privateKey: string | null | undefined
}

const axiosCreateInstance = async () => { 
    const pairKeys : PropsPairKey = { publicKey: null, privateKey: null };

    pairKeys.publicKey = await SecureStorage.getItemAsync("publicKey");

    return axios.create({
        baseURL: env.API_URL,
        headers: {
            apiKey: env.API_KEY,
            Authorization: pairKeys.publicKey            
        }
    });
}

const Request = {
    Post: async (pointer: string, data: {} | undefined, callback: (data: any) => void) => {
        
        console.log(`Http post: ${env.API_URL}${pointer}`);

        const axiosInstance = await axiosCreateInstance(); 

        await axiosInstance.post(pointer, data).then(response => {
            callback(response.data);
        }).catch(error => {
            console.log(error);
        });
    },

    Get: async (pointer: string, data: {} | undefined, callback: (data: any) => void) => {

        console.log(`http get: ${env.API_URL}${pointer}`);

        const axiosInstance = await axiosCreateInstance();
        
        await axiosInstance.get(pointer, data).then(response => {
            callback(response.data);
        }).catch(error => {
            console.log(error);
        });
    }
}

export default Request;