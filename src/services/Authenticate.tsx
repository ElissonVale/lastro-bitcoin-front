import * as CryptoJs from 'react-native-crypto-js'
import * as SecureStorage from 'expo-secure-store'
import Request from './Requests';
import env from '../../app.configs';
import { PairKeys, hexToString, stringToHex } from './Encrypt'


type PropsCallback = (data: boolean) => void | undefined;

const checkAuthentication = async (callback: PropsCallback): Promise<boolean> => {
    const response = { success: false };
    const privateKey = await SecureStorage.getItemAsync("privateKey");

    if (privateKey)
        response.success = true;

    if (callback)
        callback(response.success);

    return response.success;
}

const encryptUserName = (userName: string): string => {

    const options = {
        iv: CryptoJs.enc.Utf8.parse(env.SECRET_VECTOR),
    };

    const userNameHash = CryptoJs.AES.encrypt(userName, CryptoJs.enc.Utf8.parse(env.SECRET_KEY), options).toString();

    return userNameHash;
}

const decryptUserName = (userName: string): string => {

    const options = { iv: CryptoJs.enc.Utf8.parse(env.SECRET_VECTOR) };

    const decrypted = CryptoJs.AES.decrypt(userName, CryptoJs.enc.Utf8.parse(env.SECRET_KEY), options).toString(CryptoJs.enc.Utf8);

    return decrypted;
}

const generateKeys = async (): Promise<PairKeys> => {

    const pairKeys: PairKeys = { publicKey: "", privateKey: "" };

    const setPairKeys = ({ publicKey, privateKey }: PairKeys) => { 
        pairKeys.privateKey = privateKey;
        pairKeys.publicKey = publicKey;
    };

    try {
        await Request.Post("/generate-keys", { }, (response) => {
            if(response.success) 
                setPairKeys({ publicKey: response.publicKey, privateKey: response.privateKey });            
        })
    }
    catch (exception) {
        console.log(exception);
    }

    return pairKeys;
}

const recoverKeys = async (privateKey: string): Promise<PairKeys> => {

    const pairKeys : PairKeys = { publicKey: "", privateKey };

    const setPublicKey = (key: string)  => pairKeys.publicKey = key;

    try {
        await Request.Post("/recover-keys", { privateKey }, response => {
            if (response.success) {
                setPublicKey(response.publicKey);
            }
        })
    } catch (exception) {
        console.log(exception);
    }

    return pairKeys;
}

type UserProps = {
    userName: string,
    walletAddress: string
}

const registerUser = async ({ userName, walletAddress }: UserProps): Promise<boolean> => {

    const result = { success: false };

    try {
        const pairKeys = await generateKeys();

        const saveKeys = async (userId: string) => {
            await SecureStorage.setItemAsync("userId", userId);
            await SecureStorage.setItemAsync("userName", userName);
            await SecureStorage.setItemAsync("publicKey", pairKeys.publicKey);
            await SecureStorage.setItemAsync("privateKey", pairKeys.privateKey);
        }

        await Request.Post("/users/new", { userName: encryptUserName(userName), walletAddress, publicKey: pairKeys.publicKey }, async response => {
            if (response.success) 
                await saveKeys(response.user.id);

            result.success = response.success;
        });
    } catch (exception) {
        result.success = false;
    }

    return result.success;
}

type UserLoginProps = {
    privateKey: string
}

const loginUser = async (props: UserLoginProps): Promise<boolean> => {

    const result = { success: true };
    try {
        const pairKeys = await recoverKeys(props.privateKey);

        const saveKeys = async () => {
            await SecureStorage.setItemAsync("publicKey", pairKeys.publicKey);
            await SecureStorage.setItemAsync("privateKey", pairKeys.privateKey);
        }

        await saveKeys();

    } catch (exception) {
        result.success = false;
    }

    return result.success;
}

const deleteAccount = async (): Promise<boolean> => {
    const result = { success: false };

    const clearUser = async () => {
        await SecureStorage.deleteItemAsync("userId");
        await SecureStorage.deleteItemAsync("userName");
        await SecureStorage.deleteItemAsync("publicKey");
        await SecureStorage.deleteItemAsync("privateKey");
    }

    const pairKeys = {
        publicKey: await SecureStorage.getItemAsync("publicKey"),
    }
    
    try {

        await Request.Post("/users/delete", { publicKey: pairKeys.publicKey }, async response => {
            if (response.success) 
                await clearUser();
            
            result.success = response.success;
        });

    } catch (exception) {
        result.success = false;
    }

    return result.success;
}

const userNameExists = async (userName: string): Promise<boolean> => {
    const result = { success: true };

    try {
        const userNameHash = encryptUserName(userName);
        
        await Request.Post("/users/validate-name", { userName: userNameHash }, response => {
            result.success = response.success;
        });
    }
    catch (exception) {
        result.success = false;
    }

    return result.success;
}

export { checkAuthentication, userNameExists, generateKeys, recoverKeys, registerUser, loginUser, encryptUserName, decryptUserName, deleteAccount };