import * as Keychain from 'react-native-keychain';
import { useState } from 'react';

const Authenticate = (children: any) => {

    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    

    Keychain.setGenericPassword("elima", "public_key");
}

type Keys = {
    publicKey: string,
    privateKey: string
}

const GenerateKeys = () : Keys => {
    const [publicKey, setPublicKey] = useState(null);
    const [privateKey, setPrivateKey] = useState(null);



    return {
        publicKey :"", // crypto.randomBytes(32).toString('hex'),
        privateKey: "" //crypto.randomBytes(64).toString('hex')
    };
}

export {Authenticate, GenerateKeys};