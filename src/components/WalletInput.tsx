import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import QRCodeReaderModal from '../components/QrCodeReader';
import { useState } from 'react';
import env from "../../app.configs";

type Props = {
    value: string | undefined,
    setValue: (data: string) => void
}

const WalletInput = (props: Props) => {

    const [qrReader, setQrReader] = useState(false);

    return (
        <View style={styles.container}>
            <TextInput value={props.value} placeholderTextColor="#8F8F8F" onChangeText={props.setValue} placeholder="Wallet Address"  style={styles.input}/>
            <TouchableOpacity style={styles.button}  onPress={() => { setQrReader(true) }}>
                <Ionicons name="qr-code" size={24} color="white" style={{ textAlign: "center", padding: 18 }} />
            </TouchableOpacity>

            <QRCodeReaderModal setValue={props.setValue} visible={qrReader} runClose={setQrReader}/>
        </View>              
    );
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        color: "#fff",
        backgroundColor: env.COLORS.DEFAULT,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 20,
        margin: 10
    },
    input: {
        width: "75%",
        color: "#FFF"
    },
    button: {
        width: "28%",
        position: "absolute",
        right: 0,
        top: 0,
        textAlign: "center",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        padding: 2.4
    }
});

export default WalletInput;