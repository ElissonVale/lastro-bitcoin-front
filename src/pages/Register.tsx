import { ButtonIcon, ButtonPrimary } from '../components/Buttons';
import Header from '../components/Header';
import WalletInput from '../components/WalletInput';
import styles from '../stylesheet/Styles';
import { Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import { registerUser } from '../services/Authenticate';
import Splashscreen from '../components/SplashScreen';
import MessageBox, { showMessage } from '../components/MessageBox';

const Register = ({ navigation }: any) => {

    const [notifyLoading, setNotifyLoading] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [address, setAddress] = useState("");
    const [alertCode, setAlertCode] = useState(0);

    const alertMessages = ["", "Username already in use!", "Please fill in the required fields to complete your registration!"];

    const handleRegistration = async () => {

        setLoading(true);

        if (userName.length < 5)
            return setErrorRegister(2);

        const response = await registerUser({ userName: userName, walletAddress: address, notifyProgress: setNotifyLoading });

        if (response.success)
            navigation.reset({ index: 0, routes: [{ name: "TokenAccess" }] });
        else if (response.message == alertMessages[1])
            setAlertCode(1);
        else
            showMessage({ message: response.message });

        setLoading(false);
    }

    const setUserNameField = (userName: string) => {
        setUserName(userName);
        setAlertCode(0);
    }

    const setErrorRegister = (codeError: any = 0) => {
        setAlertCode(codeError);
        setLoading(false);
    }

    const lastPage = () => {
        navigation.navigate("Initialize");
    }

    if (loading)
        return <Splashscreen message={notifyLoading} />

    return (
        <>
            <View style={styles.container}>
                <Header>
                    <ButtonIcon icon="arrow-back" size={28} buttonStyles={[styles.returnButton]} onPress={lastPage} />
                </Header>

                <View style={styles.containerDescription}>
                    <Text style={styles.description}>
                        To register, all you need is a unique username, and a bitcoin address for withdrawals.
                    </Text>
                </View>

                <TextInput value={userName} onChangeText={setUserNameField} placeholder="User Name *" placeholderTextColor="#8F8F8F" style={styles.input} />

                <WalletInput value={address} setValue={setAddress} />

                {alertCode > 0 && <Text style={styles.alert}>{alertMessages[alertCode]}</Text>}

                <View style={{ position: "absolute", bottom: 25, width: "50%" }}>
                    <ButtonPrimary title="Register" icon="open" onPress={handleRegistration} />
                </View>

            </View>

            <MessageBox />
        </>
    )
}

export default Register;