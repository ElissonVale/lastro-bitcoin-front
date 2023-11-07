import { Text, View } from 'react-native';
import Styles from '../styledsheet/Styles';
import { useEffect, useState } from 'react';
import Splashscreen from '../components/SplashScreen';

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load data from api

        setLoading(false);
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