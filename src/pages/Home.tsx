import { View, RefreshControl, StyleSheet } from 'react-native';
import Styles from '../stylesheet/Styles';
import { useEffect, useState } from 'react';
import Splashscreen from '../components/SplashScreen';
import { checkAuthentication } from '../services/Authenticate';
import MenuApp from '../components/MenuApp';
import Header from '../components/Header';
import { ButtonIcon } from '../components/Buttons';
import env from '../../app.configs';
import Transactions from '../components/bank/Transactions';
import { TransactionType } from './bank/Transaction';
import Founds from '../components/bank/Founds';

const Home = ({ navigation } : any) => {

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [notifyLoading, setNotifyLoading] = useState<string>("");

    const [founds, setFunds] = useState<string>("0");
    
    const [transactions, setTransactions] = useState<Array<TransactionType>>([]);

    const handleTransactions = async () => {

        setNotifyLoading("loading transactions...");

        let trans : Array<TransactionType> = [];

        while(trans.length < 2) {
            trans.push({
                id: "ooer83-435ygd-345rf",
                date: new Date().toLocaleString(),
                amount: (Math.random() * 1000).toLocaleString("pt-BR", { maximumFractionDigits: 0 }), 
                state: "confirm",
                description: "Hello world my brother and my friend - this is your payment for help me"
            });
        }

        return trans;
    }

    const handleFounds = async () => {
        setNotifyLoading("loading funds...");
        return (Math.random() * 10000).toLocaleString("pt-BR", { maximumFractionDigits: 0 }); //.toFixed(4);
    }

    const loadData = async () => {
        // load user informations
        setFunds(await handleFounds());

        // load transactions 
        setTransactions(await handleTransactions());

        // disabled load
        setRefreshing(false);
    }

    const handleLoadData = async () => {
        // Check authenticated user
        await checkAuthentication(() => {}).then((logged) => {
            if(!logged)
                navigation.reset({ index: 0, routes: [ { name: "Initialize" } ] });
        });

        // Load data from application backend
        await loadData().then();

        setLoading(false);
    }

    useEffect(() => { 

        handleLoadData();
       
    },[]);

    const handleRefresh = async () => { 
        setRefreshing(true);

        await loadData();
    };

    if(loading)
        return <Splashscreen message={notifyLoading} />

    return (
        <View style={Styles.container}>
            <Header>
                <ButtonIcon icon="person" buttonStyles={[styles.header_button, styles.header_profile_button]}  onPress={() => {}}/>
                {/* <ButtonIcon icon="arrow-redo" buttonStyles={[styles.header_button, styles.header_share_button]} onPress={() => {}}/> */}
                <ButtonIcon icon="bug" buttonStyles={[styles.header_button, styles.header_report_button]} onPress={() => {}}/>
            </Header>            

            {/* Inormation founds */}
            <Founds founds={founds}/>

            {/* Transactions list */}
            <Transactions transactions={transactions} navigation={navigation} refreshControll={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}/>

            <MenuApp navigation={navigation}/>

        </View>
    );
}

const styles = StyleSheet.create({
    header_button: {
        zIndex: 999,
        position: "relative",
        marginHorizontal: 15
    },
    header_share_button: {
        
    },
    header_report_button: {
        right: 10,
    }, 
    header_profile_button: {
        
        backgroundColor: env.COLORS.DEFAULT,
        borderRadius: 50,
    },
});

export default Home;