import * as CryptoJs from 'react-native-crypto-js'
import * as SecureStorage from 'expo-secure-store'
import Request from './Requests';
import env from '../../app.configs';

type PropsCallback = (data: boolean) => void | undefined;

const checkAuthentication = async (callback: PropsCallback) : Promise<boolean> => {
    const response = { success: false };
    const privateKey = await SecureStorage.getItemAsync("privateKey");
        
    if(privateKey)
        response.success = true;

    if(callback)
        callback(false);

    return response.success;
}

type KeysProps = {
    publicKey: string,
    privateKey: string
}

const encryptUserName = (userName: string) : string => {
    const options = {
        iv: CryptoJs.enc.Utf8.parse(env.SECRET_VECTOR),
    };
    return CryptoJs.AES.encrypt(userName + env.SECRET_CIPHER, CryptoJs.enc.Utf8.parse(env.SECRET_KEY), options).toString();
}

const decryptUserName = (userName: string) : string => {
    const options = { iv: CryptoJs.enc.Utf8.parse(env.SECRET_VECTOR) };
    const decrypted = CryptoJs.AES.decrypt(userName, CryptoJs.enc.Utf8.parse(env.SECRET_KEY), options).toString(CryptoJs.enc.Utf8);
    return decrypted.replace(env.SECRET_CIPHER, "");
}

const generateKeys = async () : Promise<KeysProps> => {
    
    const pairKeys = {
        publicKey: "",
        privateKey: ""
    };

    await Request.Post("/generate-keys", { }, (response) => {
        if(response.success) {
            pairKeys.publicKey = response.publicKey;
            pairKeys.privateKey = response.privateKey;
        }
    })

    return pairKeys;
}

const recoverKeys = async (privateKey: string) : Promise<KeysProps> => {

    const pairKeys = {
        publicKey: "",
        privateKey: privateKey
    };

    await Request.Get("/recover-keys", { privateKey }, response => {
        if(response.success) {
            pairKeys.publicKey = response.publicKey;
        }
    })

    return pairKeys;
}

type UserProps = {
    userName: string,
    walletAddress: string
}

const registerUser = async (props : UserProps) : Promise<boolean> => {
    
    const result = { success: false };

    try {
        const keys = await generateKeys();

        const saveKeys = async () => {
            await SecureStorage.setItemAsync("publicKey", keys.publicKey);
            await SecureStorage.setItemAsync("privateKey", keys.privateKey);
        }
        
        await Request.Post("/users/new", { userName: encryptUserName(props.userName), walletAddress: props.walletAddress, publicKey: keys.publicKey }, response => {
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

const loginUser = async (props: UserLoginProps) : Promise<boolean> => {

    const result = { success: true };
    try {
        const pairKeys = await recoverKeys(props.privateKey);

        const saveKeys = async () => {
            await SecureStorage.setItemAsync("publicKey", pairKeys.publicKey);
            await SecureStorage.setItemAsync("privateKey", pairKeys.privateKey);
        }

        await saveKeys();

    } catch {
        result.success = false;
    }

    return result.success;
}

const deleteAccount = async () : Promise<boolean> => {
    const result = { success: false };
    const pairKeys = {
        publicKey: await SecureStorage.getItemAsync("publicKey"),
    }

    try {
        await Request.Post("/users/delete", { publicKey: pairKeys.publicKey }, response => {
            if(response.success) {
                SecureStorage.deleteItemAsync("publicKey");
                SecureStorage.deleteItemAsync("privateKey");
            }
            result.success = response.success;
        });
    } catch {
        result.success = false;
    }

    return result.success;
}

const validateUserName = async (userName: string) : Promise<boolean> => {
    const result = { success: true };

    const userNameHash = encryptUserName(userName);

    await Request.Post("/users/validate-name", { userName: userNameHash }, response => {
        result.success = response.success;
    });

    return result.success;
}

export {checkAuthentication, validateUserName, generateKeys, recoverKeys, registerUser, loginUser, encryptUserName, decryptUserName, deleteAccount};