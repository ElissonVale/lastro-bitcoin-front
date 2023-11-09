import { Text, View, ScrollView, RefreshControl } from 'react-native';
import Styles from '../stylesheet/Styles';
import { useEffect, useState } from 'react';
import Splashscreen from '../components/SplashScreen';
import { checkAuthentication } from '../services/Authenticate';
import MenuApp from '../components/MenuApp';
import { StatusBar } from 'expo-status-bar';


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
            <Text style={{color: "#fff"}}>Home Page</Text>
 
            <MenuApp addClick={handleAdd} keyClick={handleKey} countClick={handleAccount}/>
        </View>

        </ScrollView>        
    );
}

export default Home;