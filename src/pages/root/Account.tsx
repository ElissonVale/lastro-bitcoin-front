import { View } from "react-native";
import Styles from "../../stylesheet/Styles";
import Header from "../../components/Header";
import { ButtonDefault } from "../../components/Buttons";
import { deleteAccount } from "../../services/Authenticate";
import { StatusBar } from "expo-status-bar";

const Account = ({ navigation }: any) => {

    const handleDelete = () => {
        deleteAccount().then(result => {
            if(result)
                navigation.reset({ index: 0, routes: [ { name: "Home" } ] });
        });
    }

    return (
        <View style={Styles.container}>
            <StatusBar hidden={true} />

            <Header title='Account' action={() => { navigation.reset({ index: 0, routes: [ { name: "Home" } ] }) }}></Header>

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonDefault title="Delete" onPress={handleDelete}/>
            </View>
            
        </View>
    );
}

export default Account;