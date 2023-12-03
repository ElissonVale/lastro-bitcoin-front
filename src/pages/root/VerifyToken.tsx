import { Text, TextInput, View } from "react-native";
import styles from "../../stylesheet/Styles";
import { ButtonSuccess } from "../../components/Buttons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as SecureStorage from 'expo-secure-store'
import Splashscreen from "../../components/SplashScreen";
import { checkTokenSet } from "../../services/Authenticate";

const VerifyToken = ({ navigation }: any) => {

    const [token, setToken] = useState("");
    const [tokenAccess, setTokenAccess] = useState<string | null>("");
    const [alertCode, setAlertCode] = useState(0);
    const [loading, setLoading] = useState(true)
    
    const alertMessages = ["", "Please enter the complete token!", "The entered token is incorrect!"];

    const handleLoadData = async () => {
        await checkTokenSet().then(result => {
            if(!result)
                navigation.reset({ index: 0, routes: [{ name: "TokenAccess" }] });
        })

        await SecureStorage.getItemAsync("tokenAccess").then(setTokenAccess);

        setLoading(false);
    }

    useEffect(() => {

        handleLoadData();

    }, []);

    const handleVerify = () => {
        setLoading(true);
        
        if(token.length < 4)
            setAlertCode(1);
        else if (token != tokenAccess)
            setAlertCode(2);
        else 
            navigation.reset({ index: 0, routes: [{ name: "Home" }] });

        setLoading(false);
    }

    if(loading)
        return <Splashscreen />;

    return (
        <View style={styles.container}>

            <StatusBar hidden={true} />

            <View style={styles.containerDescription}>
                <Text style={styles.description}>
                    Set a security token to access the app and confirm transactions. The token must contain only numbers.
                </Text>
            </View>

            <TextInput value={token} onChangeText={setToken} placeholder="Token *" placeholderTextColor="#8F8F8F" keyboardType="numeric" maxLength={4} style={[styles.input, { textAlign: 'center' }]} />

            {alertCode > 0 && <Text style={styles.alert}> {alertMessages[alertCode]} </Text>}

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonSuccess title="Access" onPress={handleVerify} icon="arrow-forward-circle" />
            </View>
        </View>
    );
}

export default VerifyToken;