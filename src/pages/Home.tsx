import { Text, View } from 'react-native';
import Styles from '../stylesheet/Styles';
import { useEffect, useState } from 'react';
import Splashscreen from '../components/SplashScreen';
import { checkAuthentication } from '../services/Authenticate';

const Home = ({ navigation } : any) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {        
        checkAuthentication(() => {}).then((logged) => {
            if(!logged)
                navigation.navigate("Initialize");
        });
    }, []);

    if(loading)
        return <Splashscreen/>

    return (
        <View style={Styles.container}>
            <Text>Home Page</Text>
        </View>
    );
}

export default Home;