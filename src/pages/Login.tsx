import { ButtonDefault } from '../components/Buttons';
import WalletInput from '../components/WalletInput';
import Header from '../components/Header';
import styles from '../styledsheet/Styles';
import { Text, View } from 'react-native';
import { useState } from 'react';

const Login = ({ navigation } : any) => {

    const [key, setKey] = useState("");

    return (
        <View style={styles.container}>
            
            <Header title='Sig In' action={() => navigation.navigate('Initialize')}></Header>

            <View style={styles.containerDescription}>
                <Text style={styles.description}>
                To log in to your account, simply scan the QR code of your private key. If you have access to the app on another smartphone, just go to settings - extract private key.
                </Text>
            </View>

            <WalletInput value={key} setValue={setKey} />

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonDefault title="Sig In" onPress={() => navigation.navigate('Register')} />
            </View>
        </View>
    )
}

export default Login;