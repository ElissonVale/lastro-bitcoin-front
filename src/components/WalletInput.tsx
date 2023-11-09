import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import QRCodeReaderModal from '../components/QrCodeReader';
import { useState } from 'react';

type Props = {
    value: string | undefined,
    setValue: (data: string) => void
}

const WalletInput = (props: Props) => {

    const [qrReader, setQrReader] = useState(false);

    return (
        <View style={styles.conatiner}>
            <TextInput value={props.value} placeholderTextColor="#8F8F8F" onChangeText={props.setValue} placeholder="Wallet Address"  style={styles.input}/>
            <TouchableOpacity style={styles.button}  onPress={() => { setQrReader(true) }}>
                <Ionicons name="qr-code" size={28} color="white" style={{ textAlign: "center", padding: 18 }} />
            </TouchableOpacity>

            <QRCodeReaderModal setValue={props.setValue} visible={qrReader} runClose={setQrReader}/>
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