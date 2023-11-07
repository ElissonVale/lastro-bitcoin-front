import { useState } from 'react';
import * as CryptoJs from 'react-native-crypto-js'
import * as SecureStorage from 'expo-secure-store'
import Request from './Requests';
import Config from 'react-native-config'

const Authenticate = (children: any) => {

    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState('');
    const [privateKey, setPrivateKey] = useState('');
}

type KeysProps = {
    publicKey: string,
    privateKey: string
}

const EncryptUserName = (userName: string) : string => {
    const secret_key = Config.SECRET_KEY ?? "securit_key";
    return CryptoJs.AES.encrypt(userName, secret_key).toString();
}

const DecryptUserName = (userName: string) : string => {
    const secret_key = Config.SECRET_KEY ?? "securit_key";
    return CryptoJs.AES.decrypt(userName, secret_key).toString();
}

const GenerateKeys = () : KeysProps => {
    
    const pairKeys = {
        publicKey: "",
        privateKey: ""
    };

    Request.Get("/api/keyGen", { }, (response) => {
        if(response.success) {
            pairKeys.publicKey = response.publicKey;
            pairKeys.privateKey = response.privateKey;
        }
    })

    return pairKeys;
}

type UserProps = {
    userName: string,
    walletAddress: string
}

const RegisterUser = (props : UserProps) : boolean => {
    
    const result = { success: false };

    try {
        const keys = GenerateKeys();

        const saveKeys = async () => {
            await SecureStorage.setItemAsync("publicKey", keys.publicKey);
            await SecureStorage.setItemAsync("privateKey", keys.privateKey);
        }
        
        Request.Post("/user/new", { userName: props.userName, walletAddress: props.walletAddress, publicKey: keys.publicKey }, (response) => {
            if(response.success)
                saveKeys();

            result.success = response.success;
        });
    } catch {
        result.success = false; 
    }

    return result.success;
}

type UserLoginProps = {
    privateKey: string
}

const LoginUser = (props: UserLoginProps) : boolean => {

    const pairKeys = {
        privateKey: props.privateKey,
        publicKey: ""
    };

    const result = { success: false };

    const saveKeys = async () => {
        await SecureStorage.setItemAsync("publicKey", pairKeys.publicKey);
        await SecureStorage.setItemAsync("privateKey", pairKeys.privateKey);
    }

    try {
        Request.Post("/user/sigin", { privateKey: props.privateKey }, (response) => {
            if(response.success) {
                pairKeys.privateKey = response.publicKey;
                saveKeys();
            }
            result.success = response.success;
        });
    } catch {
        result.success = false;
    }

    return result.success;
}

export {Authenticate, GenerateKeys, RegisterUser, LoginUser, EncryptUserName, DecryptUserName};