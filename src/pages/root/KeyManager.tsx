import { View } from "react-native";
import Styles from "../../stylesheet/Styles";
import Header from "../../components/Header";

const KeyManager = ({ navigation }: any) => {
    return (
        <View style={Styles.container}>
             <Header title='Key Manager' action={() => { navigation.reset({ index: 0, routes: [ { name: "Home" } ] }) }}></Header>
        </View>
    );
}

export default KeyManager;