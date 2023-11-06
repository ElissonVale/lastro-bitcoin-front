import { useState } from 'react';
import { ButtonDanger, ButtonSuccess } from '../components/Buttons';
import QRCodeReader from '../components/QrCodeReader';
import WalletInput from '../components/WalletInput';
import styles from '../styledsheet/Styles';
import { Text, View, TextInput } from 'react-native';

const Register = ({ navigation } : any) => {

    const [qrReader, setQrReader] = useState(false);
    const [qrValue, setQrValue] = useState("");

    return (
        <View style={styles.container}>

            <View style={styles.containerDescription}>
                <Text style={styles.description}>
                 To register, all you need is a unique username, and a bitcoin address for withdrawals.
                </Text>
            </View>

            <TextInput id='userName' placeholder="User Name *" placeholderTextColor="#fff" style={styles.input}/>

            <WalletInput id='walletAddress' value={qrValue} onPress={() => { setQrReader(true) }}/>

            { qrReader && <QRCodeReader setValue={setQrValue} onRead={() => {setQrReader(false)}}/> } 

            <View style={{ position: "absolute", bottom: 25, left: 10, width: "45%" }}>
                <ButtonDanger title="Back" onPress={() => navigation.navigate('Initialize')}/>                
            </View>
            <View style={{ position: "absolute", bottom: 25, right: 10, width: "45%" }}>
                <ButtonSuccess title="Register" onPress={() => navigation.navigate('Register')} />
            </View>
        </View>
    )
}

export default Register;