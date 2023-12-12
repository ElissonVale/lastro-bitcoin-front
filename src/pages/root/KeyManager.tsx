import { StyleSheet, View } from "react-native";
import Styles from "../../stylesheet/Styles";
import Header from "../../components/Header";
import env from "../../../app.configs";
import { ButtonIcon } from "../../components/Buttons";

const KeyManager = ({ navigation }: any) => {

    const lastPage = () => {
        navigation.reset({ index: 0, routes: [ { name: "Home" } ] })
    }

    return (
        <View style={Styles.container}>
             <Header>
                <ButtonIcon icon="arrow-back" size={28} buttonStyles={[styles.header_last_button]} onPress={lastPage} />
             </Header>
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

export default KeyManager;