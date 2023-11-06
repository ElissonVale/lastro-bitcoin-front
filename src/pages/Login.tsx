import { ButtonDanger, ButtonPrimary, ButtonSuccess } from '../components/Buttons';
import styles from '../styledsheet/Styles';
import { Text, View } from 'react-native';

const Login = ({ navigation } : any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Page</Text>

            <View style={{ position: "absolute", bottom: 25, left: 10, width: "45%" }}>
                <ButtonDanger title="Back" onPress={() => navigation.navigate('Initialize')}/>                
            </View>
            <View style={{ position: "absolute", bottom: 25, right: 10, width: "45%" }}>
                <ButtonSuccess title="Sig In" onPress={() => navigation.navigate('Register')} />
            </View>
        </View>
    )
}

export default Login;