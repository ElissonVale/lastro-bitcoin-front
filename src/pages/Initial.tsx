import React, { useEffect, useState} from 'react';
import styles from '../stylesheet/Styles';
import { View, Image, StyleSheet } from 'react-native';
import { ButtonDefault, ButtonPrimary } from '../components/Buttons';
import Splashscreen from '../components/SplashScreen';
import { checkAuthentication } from '../services/Authenticate';

const Initial = ({ navigation } : any) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        checkAuthentication(setLoading).then((logged) => {
            if(logged) 
                navigation.reset({ index: 0, routes: [ { name: "VerifyToken" } ] });            
        });

    }, []);

    if(loading)
        return <Splashscreen message='checking authentication...' />;
    
    return (
        <View style={styles.container}>

            <Image style={styles_home.logo} source={require("../../assets/logo.png")} />

            <View style={{ position: "absolute", bottom: 25, left: 10, width: "45%", zIndex: 99 }}>
                <ButtonPrimary title="Sign In" icon="arrow-forward-circle" onPress={() => navigation.navigate('Login')}/>                
            </View>
            <View style={{ position: "absolute", bottom: 25, right: 10, width: "45%", zIndex: 99 }}>
                <ButtonDefault title="Register" icon="duplicate" onPress={() => navigation.navigate('Register')} />
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