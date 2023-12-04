import { ButtonIcon, ButtonPrimary } from '../components/Buttons';
import WalletInput from '../components/WalletInput';
import Header from '../components/Header';
import styles from '../stylesheet/Styles';
import { Text, View, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { loginUser } from '../services/Authenticate';
import Splashscreen from '../components/SplashScreen';
import { StatusBar } from 'expo-status-bar';
import Styles from '../stylesheet/Styles';
import MessageBox, { showMessage } from '../components/MessageBox';

const Login = ({ navigation } : any) => {

    const [loading, setLoading] = useState(true);
    const [privateKey, setPrivateKey] = useState("");
    const [alertCode, setAlertCode] = useState(0);
    const [notifyLoading, setNotifyLoading] = useState<string>();

    const alertMessages = ["",
        "Please scan your private key or paste it into the field to access the app!",
        "Private key is not complete, please verify your key!"
    ];

    const handleLogin = async () => {
        setLoading(true);
        if(!!!privateKey)
            setAlertCode(1);
        else if(privateKey.length < 32)
            setAlertCode(2);
        else {
            await loginUser({ privateKey: privateKey, notifyProgress: setNotifyLoading }).then(result => {
                if(!result)
                    showMessage({ message: "Oops, an unexpected error occurred while logging in, please verify and correctly enter your private key!" });
                else
                    navigation.reset({ index: 0, routes: [ { name: "Home" } ] });
            });
        }

        setLoading(false);
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    const lastPage = () => { 
        navigation.navigate("Initialize");
    }

    if(loading)
        return <Splashscreen message={notifyLoading} />

    return (
        <>
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

            {alertCode > 0 && <Text style={styles.alert}>{alertMessages[alertCode]}</Text>}

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonPrimary title="Sign In" icon="arrow-forward-circle" onPress={handleLogin} />
            </View>
        </View>
        <MessageBox />
        </>
    )
}

export default Login;