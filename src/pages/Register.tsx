import { ButtonDefault } from '../components/Buttons';
import Header from '../components/Header';
import WalletInput from '../components/WalletInput';
import styles from '../styledsheet/Styles';
import { Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { RegisterUser } from '../services/Authenticate';
import Splashscreen from '../components/SplashScreen';

const Register = ({ navigation } : any) => {

    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [address, setAddress] = useState("");

    const handleRegistration = () => {
        if(!!userName && !!address) {
            setLoading(true);

            if(RegisterUser({ userName: userName, walletAddress: address})) {
                setLoading(false);
                navigation.navigate("Home");
            } else {
                setLoading(false);
                Alert.alert("", "Oops, we were unable to complete the registration. The issue has been reported, and we are investigating. Please try again later!");
            }
        } else 
            Alert.alert("", "Please fill in the required fields to complete your registration!");
    }

    if(loading)
        return <Splashscreen/>

    return (
        <View style={styles.container}>

            <Header title='Register' action={() => navigation.navigate('Initialize')}></Header>

            <View style={styles.containerDescription}>
                <Text style={styles.description}>
                 To register, all you need is a unique username, and a bitcoin address for withdrawals.
                </Text>
            </View>

            <TextInput value={userName} onChangeText={setUserName} placeholder="User Name *" placeholderTextColor="#fff" style={styles.input}/>

            <WalletInput value={address} setValue={setAddress} />

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonDefault title="Register" onPress={handleRegistration} />
            </View>
        </View>
    )
}

export default Register;