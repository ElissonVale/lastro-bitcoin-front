import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

type Props = {
    title: string,
    action: () => void
}

const Header = (props: Props) => {

    return (
        <View style={styles.head}>
             <TouchableOpacity style={styles.button} onPress={props.action}>
                <Ionicons name="arrow-back" size={28} color="white" style={{ textAlign: "center", padding: 18 }} />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    title: {
        color: "#FFF",
        textAlign: "center",
        padding: 24,
        fontWeight: "bold"
    },
    head: {
        width: "100%",
        position: "absolute",
        padding: 10,
        top: 0
    },
    button: {
        borderColor: "#FFF",
        position: "absolute",
        left: 15,
        top: 20,
        zIndex: 999,
    }
});

export default Header;