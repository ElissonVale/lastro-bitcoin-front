import { getRandomBytes } from "expo-crypto";
import { fromByteArray } from "base64-js";
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

type PairKeys = {
    publicKey: string,
    privateKey: string
}

const generateKeys = (bytes: Int32 = 256) : PairKeys => {

    const privateKey = fromByteArray(getRandomBytes(256));

    // generate publicKey from privateKey 
    const publicKey = null;

    return {
        privateKey,
        publicKey: ''
    }
}

const stringToHex = (str: string) : string => {
    return str.split('').map(char => char.charCodeAt(0).toString(16)).join('');
}

const hexToString = (hex: string) => {

    const hexArray = hex.match(/.{1,2}/g);

    const text = hexArray?.map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    
    return text ? text : "";
  };

export { stringToHex, hexToString, generateKeys, PairKeys }

