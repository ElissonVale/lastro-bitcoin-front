import { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import * as SecureStorage from 'expo-secure-store'
import styles from "../../stylesheet/Styles";
import { StatusBar } from "expo-status-bar";
import { ButtonPrimary } from "../../components/Buttons";
import Splashscreen from "../../components/SplashScreen";


const TokenAccess = ({ navigation }: any) => {

    const [token, setToken] = useState<string>("");
    const [confirmToken, setConfirmToken] = useState<string>("");
    const [alertCode, setAlertCode] = useState(0);
    const [loading, setLoading] = useState(true);
    const alertMessages = ["", "Please fill in the required fields!", "The token must contain 4 numeric digits!", "The tokens do not match!"];

    const handleSetToken = async () => {

        setLoading(true);

        if (!!!token || !!!confirmToken) 
            setAlertCode(1);
        else if (token.length < 4 || confirmToken.length < 4)
            setAlertCode(2);
        else if (token !== confirmToken)
            setAlertCode(3);
        else {
            await SecureStorage.setItemAsync("tokenAccess", token);
            navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        }
        
        setLoading(false);
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    if(loading)
        return <Splashscreen />;

    return (
        <View style={styles.container}>

            <View style={styles.containerDescription}>
                <Text style={styles.description}>
                    Set a security token to access the app and confirm transactions. The token must contain only numbers.
                </Text>
            </View>

            <TextInput value={token} onChangeText={setToken} placeholder="Token *" placeholderTextColor="#8F8F8F" keyboardType="numeric" maxLength={4} style={[styles.input, { textAlign: 'center' }]} />

            <TextInput value={confirmToken} onChangeText={setConfirmToken} placeholder="Confirmation token *" placeholderTextColor="#8F8F8F" keyboardType="numeric" maxLength={4} style={[styles.input, { textAlign: 'center' }]} />

            {alertCode > 0 && <Text style={styles.alert}>{alertMessages[alertCode]}</Text>}

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonPrimary title="Finish" icon="arrow-forward-circle" onPress={handleSetToken} />
            </View>

        </View>
    )
}


export default TokenAccess;