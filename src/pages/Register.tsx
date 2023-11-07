import { ButtonDefault } from '../components/Buttons';
import Header from '../components/Header';
import WalletInput from '../components/WalletInput';
import styles from '../styledsheet/Styles';
import { Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import { GenerateKeys } from '../components/Authenticate';

const Register = ({ navigation } : any) => {

    const [userName, setUserName] = useState("");
    const [address, setAddress] = useState("");

    const handleRegistration = () => {
        if(!!!userName && !!!address)
            return false;

        const keys = GenerateKeys();

        navigation.navigate("Home");
    }

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