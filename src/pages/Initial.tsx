import React, { useEffect, useState} from 'react';
import styles from '../styledsheet/Styles';
import { View, Image, StyleSheet } from 'react-native';
import { ButtonDefault, ButtonSuccess } from '../components/Buttons';
import * as SecureStorage from 'expo-secure-store'
import Splashscreen from '../components/SplashScreen';

const Initial = ({ navigation } : any) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkauthentication = async () => {
            const privateKey = await SecureStorage.getItemAsync("privateKey");
            if(privateKey)
                navigation.navigate("Home");

            setLoading(false);
        }

        checkauthentication();
    }, []);

    if(loading)
        return <Splashscreen />;
    

    return (
        <View style={styles.container}>

            <Image style={styles_home.logo} source={require("../../assets/logo.png")} />

            <View style={{ position: "absolute", bottom: 25, left: 10, width: "45%" }}>
                <ButtonDefault title="Sig In" onPress={() => navigation.navigate('Login')}/>                
            </View>
            <View style={{ position: "absolute", bottom: 25, right: 10, width: "45%" }}>
                <ButtonSuccess title="Register" onPress={() => navigation.navigate('Register')} />
            </View>

        </View>
    )
}

const styles_home = StyleSheet.create({
    logo: {
        maxWidth: "80%",
        height: "30%",
        marginTop: -100
    },
});

export default Initial;