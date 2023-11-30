import { View } from "react-native";
import Styles from "../../stylesheet/Styles";
import Header from "../../components/Header";
import { ButtonDefault, ButtonIcon } from "../../components/Buttons";
import { deleteAccount } from "../../services/Authenticate";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Splashscreen from "../../components/SplashScreen";

const Account = ({ navigation }: any) => {

    const [loading, setLoading] = useState(true);

    const lastPage = () => { 
        navigation.reset({ index: 0, routes: [ { name: "Home" } ] });
    }

    const handleDelete = async () => {
        
        setLoading(true);

        if(await deleteAccount())
            navigation.reset({ index: 0, routes: [ { name: "Initialize" } ] });
        else
            setLoading(false);
    }

    useEffect(() => {
        // Load data  from API

        setLoading(false);
    }, []);

    if(loading)
        return <Splashscreen/>

    return (
        <View style={Styles.container}>
            <StatusBar hidden={true} />

            <Header>
                <ButtonIcon icon="arrow-back" size={28} buttonStyles={[Styles.returnButton]} onPress={lastPage} />
            </Header>

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonDefault title="Delete" onPress={handleDelete}/>
            </View>
            
        </View>
    );
}

export default Account;