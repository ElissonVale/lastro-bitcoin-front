import { Text, View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import Styles from '../stylesheet/Styles';
import { useEffect, useState } from 'react';
import Splashscreen from '../components/SplashScreen';
import { checkAuthentication } from '../services/Authenticate';
import MenuApp from '../components/MenuApp';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import { ButtonIcon } from '../components/Buttons';
import env from '../../app.configs';


const Home = ({ navigation } : any) => {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => { 
        // Check authenticated user
        checkAuthentication(() => {}).then((logged) => {
            if(!logged)
                navigation.reset({ index: 0, routes: [ { name: "Initialize" } ] });
        });
        // Load data from application backend
        setLoading(false);
    },[]);

    const handleRefresh = () => { 
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const handleAccount = () => { 
        navigation.navigate('Account');
    }

    const handleKey = () => { 
        navigation.navigate('KeyManager');
    }

    const handleAdd = () => { 
        // navigation.navigate('Add');
    }

    if(loading)
        return <Splashscreen/>

    return (
       
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}
            />
        } >
         <StatusBar hidden={true}/>

        <View style={Styles.container}>

            <Header>
                <ButtonIcon icon="arrow-redo" buttonStyles={[styles.header_share_button]} onPress={() => {}}/>
            </Header>

            <Text style={{color: "#fff"}}>Home Page</Text>
 
            <MenuApp addClick={handleAdd} keyClick={handleKey} countClick={handleAccount}/>
        </View>

        </ScrollView>        
    );
}

const styles = StyleSheet.create({
    header_share_button: {
        borderColor: env.COLORS.WHITE,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 999,
        marginHorizontal: 15
    }
});

export default Home;