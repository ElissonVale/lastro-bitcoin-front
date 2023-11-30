import { ButtonIcon, ButtonPrimary } from '../components/Buttons';
import Header from '../components/Header';
import WalletInput from '../components/WalletInput';
import styles from '../stylesheet/Styles';
import { Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { registerUser, userNameExists } from '../services/Authenticate';
import Splashscreen from '../components/SplashScreen';
import { StatusBar } from 'expo-status-bar';
import Styles from '../stylesheet/Styles';

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

    const lastPage = () => { 
        navigation.navigate("Initialize");
    }

    if(loading)
        return <Splashscreen/>

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />

            <Header>
                <ButtonIcon icon="arrow-back" size={28} buttonStyles={[Styles.returnButton]} onPress={lastPage} />
            </Header>

            <View style={styles.containerDescription}>
                <Text style={styles.description}>
                 To register, all you need is a unique username, and a bitcoin address for withdrawals.
                </Text>
            </View>

            <TextInput value={userName} onChangeText={setUserNameField} placeholder="User Name *" placeholderTextColor="#8F8F8F" style={styles.input}/>

            <WalletInput value={address} setValue={setAddress} />

            { alertCode > 0 &&  <Text style={Styles.alert}>{alertMessages[alertCode]}</Text> }

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonPrimary title="REGISTER" onPress={handleRegistration} />
            </View>
        </View>
    )
}

export default Register;