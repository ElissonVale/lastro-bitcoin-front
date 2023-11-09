import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import env from '../../app.configs';

type Props = {
    title: string,
    action: () => void
}

const Header = (props: Props) => {

    return (
        <View style={styles.head}>
             <TouchableOpacity style={styles.button} onPress={props.action}>
                <Ionicons name="arrow-back" size={28} color={env.COLORS.WHITE} style={{ textAlign: "center", padding: 18 }} />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    head: {
        width: "100%",
        position: "absolute",
        // marginHorizontal: 10,
        // marginVertical: 18,
        top: 0
    },
    button: {
        borderColor: env.COLORS.WHITE,
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 999,
        marginHorizontal: 10
    }
});

export default Header;