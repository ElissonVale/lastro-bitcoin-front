import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

type Props = {
    id: string,
    onPress: () => void,
    value: string | undefined
}

const WalletInput = (props: Props) => {
    
    return (
        <View style={styles.conatiner}>
            <TextInput id={props.id} placeholderTextColor="#FFF" placeholder="Wallet Address" value={props.value} style={styles.input}/>
            <TouchableOpacity style={styles.button}  onPress={props.onPress}>
                <Ionicons name="qr-code" size={28} color="white" style={{ textAlign: "center", padding: 18 }} />
            </TouchableOpacity>
        </View>              
    );
}

const styles = StyleSheet.create({
    conatiner: {
        width: "90%",
        color: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 50,
        margin: 10
    },
    input: {
        width: "70%",
        color: "#FFF"
    },
    button: {
        width: "28%",
        position: "absolute",
        right: 0,
        top: 0,
        textAlign: "center",
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30
    },
    qrReader: {
        flex: 1,
        top: -400,
        // position: "absolute",
        width: "100%",
        height: 500,
        backgroundColor: "#000000"
    }
});

export default WalletInput;