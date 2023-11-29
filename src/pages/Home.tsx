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

type Transaction = {
    amount: string
}

const Home = ({ navigation } : any) => {

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [founds, setFounds] = useState<string>("0");
    const [foundTag, setFoundTag] = useState("Sats");
    const transactions : Array<Transaction> = [];

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

    const handleTransactions = () => {

        for(let i = 0; i <= 30; i++) {
            transactions.push({
                amount: Math.random().toString()
            });
        }

        return transactions.map(data => {
            return (<View style={styles.container_transaction}>
                <Text style={styles.transaction_amount}>{data.amount}</Text>
            </View>);
        }) 
    }

    if(loading)
        return <Splashscreen/>

    return (
        <>
       
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} /> } >
                <StatusBar hidden={true}/>

                <View style={Styles.container}>

                    <Header>
                        <ButtonIcon icon="arrow-redo" buttonStyles={[styles.header_share_button]} onPress={() => {}}/>
                        <ButtonIcon icon="bug" buttonStyles={[styles.header_report_button]} onPress={() => {}}/>
                    </Header>

                    {/* Inormation founds */}
                    <View style={[Styles.container, styles.container_founds]}>
                        <View style={[Styles.container, { width: "100%" }]}>
                            <Text style={styles.founds}> {founds} </Text>
                            <Text style={styles.found_tag}> {foundTag} </Text>
                        </View>
                    </View>

                    <View style={styles.container_transactions}>
                        { 
                           handleTransactions()
                        }                    
                    </View>

                </View>

            </ScrollView> 

            <MenuApp addClick={handleAdd} keyClick={handleKey} countClick={handleAccount}/>
        </>       
    );
}

const styles = StyleSheet.create({
    header_share_button: {
        position: "absolute",
        right: 0,
        top: 10,
        zIndex: 999,
        marginHorizontal: 15
    },
    header_report_button: {
        position: "absolute",
        right: 82,
        top: 10,
        zIndex: 999,
        marginHorizontal: 15
    }, 
    header_profile_button: {
        position: "absolute",
        left: 0,
        top: 10,
        zIndex: 999,
        marginHorizontal: 15
    },
    container_founds: {
        width: "100%",
        marginTop: 80,
        // borderColor: env.COLORS.WHITE,
        // borderWidth: 1
    },
    found_tag: {
        color: env.COLORS.GREEN,
        fontSize: 18
    },
    founds: {
        color: env.COLORS.GREEN,
        fontSize: 62
    },
    container_transactions: {
        width: "100%",
        backgroundColor: env.COLORS.BLACK,
    },
    container_transaction: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        padding: 45,
        borderRadius: 15, 
        backgroundColor: "rgba(255, 255, 255, .08)" //env.COLORS.GRAY
    }, 
    transaction_amount: {
        color: env.COLORS.RED,
        fontSize: 20,
        
    }
});

export default Home;