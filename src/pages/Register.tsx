import { ButtonPrimary } from '../components/Buttons';
import Header from '../components/Header';
import WalletInput from '../components/WalletInput';
import styles from '../stylesheet/Styles';
import { Text, View, TextInput, Alert, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { registerUser, checkAuthentication, userNameExists } from '../services/Authenticate';
import Splashscreen from '../components/SplashScreen';
import { StatusBar } from 'expo-status-bar';

const Register = ({ navigation } : any) => {

    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [address, setAddress] = useState("");
    const [alertCode, setAlertCode] = useState(0);

    const alertMessages = ["", "Username already in use!", "Please fill in the required fields to complete your registration!"];

    const handleRegistration = async () => {

        setLoading(true);

        if(userName.length < 5)
            return setErrorRegister(2);

        if(await userNameExists(userName.trim()))
            return setErrorRegister(1);

        if(await registerUser({ userName: userName, walletAddress: address}))
            navigation.reset({ index: 0, routes: [ { name: "Home" } ] });
        else 
            Alert.alert("", "Oops, we were unable to complete the registration. The issue has been reported, and we are investigating. Please try again later!");
        
        setLoading(false);
    }

    const setUserNameField = (userName: string) => {
        setUserName(userName.trim());
        setAlertCode(0);
    }

    const setErrorRegister = (codeError: any = 0) => {
        setAlertCode(codeError);
        setLoading(false);        
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

            <Header>
                
            </Header>

            <View style={styles.containerDescription}>
                <Text style={styles.description}>
                 To register, all you need is a unique username, and a bitcoin address for withdrawals.
                </Text>
            </View>

            <TextInput value={userName} onChangeText={setUserNameField} placeholder="User Name *" placeholderTextColor="#8F8F8F" style={styles.input}/>

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