import axios from "axios";
import env from "../../app.configs";
import * as SecureStorage from 'expo-secure-store'

type PropsPairKey = {
    publicKey: string | null | undefined,
    privateKey: string | null | undefined
}

const apiCreate = () => { 
    const pairKeys : PropsPairKey = { publicKey: null, privateKey: null };

    SecureStorage.getItemAsync("publicKey").then(key => {
        pairKeys.publicKey = key;
    });

    return axios.create({
        baseURL: env.API_URL,
        headers: {
            apiKey: env.API_KEY,
            Authorization: pairKeys.publicKey
        }
    });
}

const Request = {
    Post: (pointer: string, data: {} | undefined, callback: (data: any) => void) => {
        
        console.log(`Http post: ${env.API_URL}${pointer}`);

        const _api = apiCreate();
        
        return _api.post(pointer, data)
        .then(response => { 
            callback(response.data);
        }).catch(error => console.log(error));
    },

    Get: (pointer: string, data: {} | undefined, callback: (data: any) => void) => {

        console.log(`http get: ${env.API_URL}${pointer}`);

        const _api = apiCreate();

        return _api.get(pointer, data)
        .then(response => {
            callback(response.data);
        }).catch(error => console.log(error));
    }
}

export default Request;