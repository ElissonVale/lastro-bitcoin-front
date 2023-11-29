import { StyleSheet, View } from "react-native";
import Styles from "../../stylesheet/Styles";
import Header from "../../components/Header";
import { ButtonDefault, ButtonIcon } from "../../components/Buttons";
import { deleteAccount } from "../../services/Authenticate";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Splashscreen from "../../components/SplashScreen";
import env from "../../../app.configs";

const Account = ({ navigation }: any) => {

    const [loading, setLoading] = useState(true);

    const lastPage = () => { 
        navigation.reset({ index: 0, routes: [ { name: "Home" } ] });
    }

    const handleDelete = () => {
        setLoading(true);
        deleteAccount().then(result => {
            if(result)
                navigation.reset({ index: 0, routes: [ { name: "Home" } ] });
            else 
                setLoading(false);
        });
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
                <ButtonIcon icon="arrow-back" size={28} buttonStyles={[styles.header_last_button]} onPress={lastPage} />
            </Header>

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonDefault title="Delete" onPress={handleDelete}/>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    header_last_button: {
        borderColor: env.COLORS.WHITE,
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 999,
        marginHorizontal: 10
    }
});
export default Account;