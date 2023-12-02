import { ButtonIcon, ButtonPrimary } from '../components/Buttons';
import WalletInput from '../components/WalletInput';
import Header from '../components/Header';
import styles from '../stylesheet/Styles';
import { Text, View, Alert } from 'react-native';
import { useState } from 'react';
import { loginUser } from '../services/Authenticate';
import Splashscreen from '../components/SplashScreen';
import { StatusBar } from 'expo-status-bar';
import Styles from '../stylesheet/Styles';

const Login = ({ navigation } : any) => {

    const [loading, setLoading] = useState(false);
    const [privateKey, setPrivateKey] = useState("");
    const [notifyLoading, setNotifyLoading] = useState<string>();

    const handleLogin = async () => {
        if(privateKey) {
            setLoading(true);

            if(await loginUser({ privateKey: privateKey, notifyProgress: setNotifyLoading })) {
                setLoading(false);
                navigation.reset({ index: 0, routes: [ { name: "Home" } ] });
            } else {
                setLoading(false);
                Alert.alert("", "Oops, an unexpected error occurred while logging in, please verify and correctly enter your private key!")
            }
        } else {
            Alert.alert("", "Please scan your private key or paste it into the field to access the app!")
        }
    }

    const lastPage = () => { 
        navigation.navigate("Initialize");
    }

    if(loading)
        return <Splashscreen message={notifyLoading} />

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            
            <Header>
                <ButtonIcon icon="arrow-back" size={28} buttonStyles={[Styles.returnButton]} onPress={lastPage} />
            </Header>

            <View style={styles.containerDescription}>
                <Text style={styles.description}>
                To log in to your account, simply scan the QR code of your private key. If you have access to the app on another smartphone, just go to settings - extract private key.
                </Text>
            </View>

            <WalletInput value={privateKey} setValue={setPrivateKey} placeHolder='Private Key*'/>

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonPrimary title="Sign In" icon="arrow-forward-circle" onPress={handleLogin} />
            </View>
        </View>
    )
}

export default Login;