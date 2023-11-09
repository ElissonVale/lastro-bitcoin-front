import { ButtonDefault } from '../components/Buttons';
import WalletInput from '../components/WalletInput';
import Header from '../components/Header';
import styles from '../stylesheet/Styles';
import { Text, View, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { loginUser, checkAuthentication } from '../services/Authenticate';
import Splashscreen from '../components/SplashScreen';

const Login = ({ navigation } : any) => {

    const [loading, setLoading] = useState(false);
    const [privateKey, setPrivateKey] = useState("");

    const handleLogin = async () => {
        if(privateKey) {
            setLoading(true);

            if(await loginUser({ privateKey: privateKey })) {
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
            
            <Header title='Sig In' action={() => navigation.navigate('Initialize')}></Header>

            <View style={styles.containerDescription}>
                <Text style={styles.description}>
                To log in to your account, simply scan the QR code of your private key. If you have access to the app on another smartphone, just go to settings - extract private key.
                </Text>
            </View>

            <WalletInput value={privateKey} setValue={setPrivateKey} />

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonDefault title="Sig In" onPress={handleLogin} />
            </View>
        </View>
    )
}

export default Login;