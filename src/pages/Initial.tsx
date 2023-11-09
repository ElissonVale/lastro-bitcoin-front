import React, { useEffect, useState} from 'react';
import styles from '../stylesheet/Styles';
import { View, Image, StyleSheet } from 'react-native';
import { ButtonDefault, ButtonSuccess } from '../components/Buttons';
import Splashscreen from '../components/SplashScreen';
import { checkAuthentication } from '../services/Authenticate';

const Initial = ({ navigation } : any) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        checkAuthentication(() => {}).then((logged) => {
            if(logged)
                navigation.reset({ index: 0, routes: [ { name: "Home" } ] });
            else
                setLoading(false);
        });

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