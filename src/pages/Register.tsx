import { ButtonPrimary } from '../components/Buttons';
import Header from '../components/Header';
import WalletInput from '../components/WalletInput';
import styles from '../stylesheet/Styles';
import { Text, View, TextInput, Alert, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { registerUser, checkAuthentication, validateUserName } from '../services/Authenticate';
import Splashscreen from '../components/SplashScreen';
import { StatusBar } from 'expo-status-bar';

const Register = ({ navigation } : any) => {

    const [searchTimeOut, setSearchTimeOut] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [validUserName, setValidUserName] = useState(true);
    const [userName, setUserName] = useState("");
    const [address, setAddress] = useState("");
    const [alertCode, setAlertCode] = useState(0);
    const alertMessages = ["", "Username already in use!", "Please fill in the required fields to complete your registration!"];

    const handleRegistration = async () => {

        await validateName(userName);

        if(!!userName && alertCode == 0) {
            setAlertCode(0);
            setLoading(true);

            if(await registerUser({ userName: userName, walletAddress: address})) {
                setLoading(false);
                navigation.reset({ index: 0, routes: [ { name: "Home" } ] });
            } else {
                setLoading(false);
                Alert.alert("", "Oops, we were unable to complete the registration. The issue has been reported, and we are investigating. Please try again later!");
            }
        } else 
            setAlertCode(2);
    }

    const validateName = async (name: string) => {

        setUserName(name);

        if(name && name.length > 4) {

            clearTimeout(searchTimeOut);

            const timeout = setTimeout(() => { 
                validateUserName(name.trim()).then((isValid) => {
                    setValidUserName(isValid);
                    if(!isValid) 
                        setAlertCode(1);
                    else
                        setAlertCode(0);
                });
            }, 500);

            setSearchTimeOut(timeout);
        }
    }

    useEffect(() => {
        
        checkAuthentication(setLoading).then((logged) => {
            if(logged)
                navigation.reset({ index: 0, routes: [ { name: "Home" } ] });
        });

    }, []);

    if(loading)
        return <Splashscreen/>

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />

            <Header title='Register' action={() => navigation.navigate('Initialize')}></Header>

            <View style={styles.containerDescription}>
                <Text style={styles.description}>
                 To register, all you need is a unique username, and a bitcoin address for withdrawals.
                </Text>
            </View>

            <TextInput value={userName} 
                onChangeText={validateName} placeholder="User Name *" placeholderTextColor="#8F8F8F" 
                style={[styles.input, { borderColor: validUserName ? "#FFF" : "#EB5757" }]}/>

            <WalletInput value={address} setValue={setAddress} />

            { alertCode > 0 &&  <Text style={alerts.alert}>{alertMessages[alertCode]}</Text> }

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonPrimary title="REGISTER" onPress={handleRegistration} />
            </View>
        </View>
    )
}

const alerts = StyleSheet.create({
    alert: {
        color: "#EB5757",
        margin: 10, 
        backgroundColor: "rgba(255,0,0,.2)",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
    }
});
export default Register;