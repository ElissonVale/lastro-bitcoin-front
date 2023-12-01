import CryptoJs from 'react-native-crypto-js'
import * as SecureStorage from 'expo-secure-store'
import Request from './Requests'
import env from '../../app.configs'
import { PairKeys } from './Encrypt'
import { AxiosError } from 'axios'


type PropsCallback = (data: boolean) => void | undefined;

type DefaultResponse = { success: boolean, message: string };

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

    await Request.Post("/generate-keys", {}, (response) => {
        if(response.success) 
            setPairKeys({ publicKey: response.publicKey, privateKey: response.privateKey });            
    });

    return pairKeys;
}

const recoverKeys = async (privateKey: string): Promise<PairKeys> => {

    const pairKeys : PairKeys = { publicKey: "", privateKey };

    const setPublicKey = (key: string)  => pairKeys.publicKey = key;

    try {
        await Request.Post("/recover-keys", { privateKey }, response => {
            if (response.success)
                setPublicKey(response.publicKey);
        })
    } catch (exception) {
        console.log(exception);
    }

    return pairKeys;
}

type userNameProps = {
    userName: string,
    notifyProgress: (message: string) => void
};

const userNameExists = async ({ userName, notifyProgress }: userNameProps): Promise<boolean> => {
    const result = { success: true };

    const userNameHash = encryptUserName(userName);
    
    notifyProgress("Checking username...");

    await Request.Post("/users/validate-name", { userName: userNameHash }, response => {
        result.success = response.success;
    });

    return result.success;
}

type registerUserProps = {
    userName: string,
    walletAddress: string,
    notifyProgress: (message: string) => void
}

const registerUser = async ({ userName, walletAddress, notifyProgress }: registerUserProps): Promise<DefaultResponse> => {

    const result : DefaultResponse = { success: false, message: "" };

    try 
    {
        if(await userNameExists({ userName, notifyProgress })) 
            throw new Error("Username already in use!");

        notifyProgress("Generating keys...");

        const pairKeys = await generateKeys();

        const saveKeys = async (userId: string) => {
            await SecureStorage.setItemAsync("userId", userId);
            await SecureStorage.setItemAsync("userName", userName);
            await SecureStorage.setItemAsync("publicKey", pairKeys.publicKey);
            await SecureStorage.setItemAsync("privateKey", pairKeys.privateKey);
        }

        notifyProgress("Registering user...");

        await Request.Post("/users/new", { userName: encryptUserName(userName), walletAddress, publicKey: pairKeys.publicKey }, async response => {
            if (response.success) 
                await saveKeys(response.user.id);

            result.success = response.success;
        });

    } 
    catch (exception) {
        if(exception instanceof Error)
            result.message = exception.message;
    }

    return result;
}

type UserLoginProps = {
    privateKey: string,
    notifyProgress: (message: string) => void
}

const loginUser = async ({ privateKey, notifyProgress }: UserLoginProps): Promise<boolean> => {

    const result = { success: true };
    try 
    {
        notifyProgress("Recovering pair keys...");

        const pairKeys = await recoverKeys(privateKey);

        const saveKeys = async () => {
            await SecureStorage.setItemAsync("publicKey", pairKeys.publicKey);
            await SecureStorage.setItemAsync("privateKey", pairKeys.privateKey);
        }

        notifyProgress("Saving keys...");

        await saveKeys();

    } catch (exception) {
        result.success = false;
    }

    return result.success;
}

type deleteUserProps = {
    notifyProgress: (message: string) => void
}

const deleteAccount = async ({ notifyProgress }: deleteUserProps): Promise<boolean> => {
    const result = { success: false };

    const clearUser = async () => {
        await SecureStorage.deleteItemAsync("userId");
        await SecureStorage.deleteItemAsync("userName");
        await SecureStorage.deleteItemAsync("publicKey");
        await SecureStorage.deleteItemAsync("privateKey");
    }

    const infoUser = {
        userId: await SecureStorage.getItemAsync("userId"),
        publicKey: await SecureStorage.getItemAsync("publicKey"),
    }
    
    try 
    {
        notifyProgress("Deleting user informations...");

        await Request.Post("/users/delete", { userId: infoUser.userId, publicKey: infoUser.publicKey }, async response => {
            if (response.success) {
                notifyProgress("Clearing session...");
                await clearUser();
            }
            
            result.success = response.success;
        });

    } catch (exception) {
        result.success = false;
    }

    return result.success;
}

export { checkAuthentication, generateKeys, recoverKeys, registerUser, loginUser, encryptUserName, decryptUserName, deleteAccount };