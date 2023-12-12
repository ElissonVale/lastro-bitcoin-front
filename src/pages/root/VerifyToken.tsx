import { Text, TextInput, View } from "react-native";
import styles from "../../stylesheet/Styles";
import { ButtonPrimary } from "../../components/Buttons";
import { useEffect, useState } from "react";
import * as SecureStorage from 'expo-secure-store'
import Splashscreen from "../../components/SplashScreen";
import { checkTokenSet } from "../../services/Authenticate";
import * as LocalAuthentication from 'expo-local-authentication';
import { showMessage } from "../../components/MessageBox";

const VerifyToken = ({ navigation }: any) => {

    const [token, setToken] = useState("");
    const [tokenAccess, setTokenAccess] = useState<string | null>("");
    const [alertCode, setAlertCode] = useState(0);
    const [loading, setLoading] = useState(true);

    const alertMessages = ["", "Please enter the complete token!", "The entered token is incorrect!"];

    const handleLoadData = async () => {

        await checkTokenSet().then(result => {
            if (!result)
                navigation.reset({ index: 0, routes: [{ name: "TokenAccess" }] });
        })

        await SecureStorage.getItemAsync("tokenAccess").then(setTokenAccess);

        setLoading(false);

        await checkBiometricAvailability();
    }

    useEffect(() => {

        handleLoadData();

    }, []);

    const checkBiometricAvailability = async () => {
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

        if (isBiometricAvailable) 
            authenticateWithBiometrics();
    };

    const authenticateWithBiometrics = async () => {
        const { success } = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Autentique-se usando a biometria',
        });

        if (success)             
            navigation.reset({ index: 0, routes: [{ name: "Home" }] });   
    };

    const handleVerify = () => {
        setLoading(true);

        if (token.length < 4)
            setAlertCode(1);
        else if (token != tokenAccess)
            setAlertCode(2);
        else
            navigation.reset({ index: 0, routes: [{ name: "Home" }] });

        setLoading(false);
    }

    if (loading)
        return <Splashscreen />;

    return (
        <View style={styles.container}>

            <View style={styles.containerDescription}>
                <Text style={styles.description}>
                    Set a security token to access the app and confirm transactions. The token must contain only numbers.
                </Text>
            </View>

            <TextInput value={token} onChangeText={setToken} placeholder="Token *" placeholderTextColor="#8F8F8F" keyboardType="numeric" maxLength={4} style={[styles.input, { textAlign: 'center' }]} />

            {alertCode > 0 && <Text style={styles.alert}> {alertMessages[alertCode]} </Text>}

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonPrimary title="Access" onPress={handleVerify} icon="arrow-forward-circle" />
            </View>
        </View>
    );
}

export default VerifyToken;