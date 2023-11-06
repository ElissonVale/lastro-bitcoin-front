import * as Keychain from 'react-native-keychain';
import React, { useState, useEffect } from 'react';

const Authenticate = (children: any) => {

    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    

    Keychain.setGenericPassword("elima", "public_key");
}

export default Authenticate;