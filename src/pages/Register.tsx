import { ButtonDefault } from '../components/Buttons';
import Header from '../components/Header';
import WalletInput from '../components/WalletInput';
import styles from '../styledsheet/Styles';
import { Text, View, TextInput } from 'react-native';

const Register = ({ navigation } : any) => {

    return (
        <View style={styles.container}>

            <Header title='Register' action={() => navigation.navigate('Initialize')}></Header>

            <View style={styles.containerDescription}>
                <Text style={styles.description}>
                 To register, all you need is a unique username, and a bitcoin address for withdrawals.
                </Text>
            </View>

            <TextInput id='userName' placeholder="User Name *" placeholderTextColor="#fff" style={styles.input}/>

            <WalletInput id='walletAddress' />

            <View style={{ position: "absolute", bottom: 25, width: "45%" }}>
                <ButtonDefault title="Register" onPress={() => navigation.navigate('Register')} />
            </View>
        </View>
    )
}

export default Register;