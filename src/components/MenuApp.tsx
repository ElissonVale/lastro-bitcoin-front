import { StyleSheet, View } from 'react-native';
import { ButtonIcon } from '../components/Buttons'
import env from '../../app.configs';

const MenuApp = ({ navigation }: any) => {

    const handleAccount = () => { 
        navigation.navigate('Account');
    }

    const handleKey = () => { 
        navigation.navigate('KeyManager');
    }

    const handleAdd = () => { 
        // navigation.navigate('Add');
    }

    return (
        <View style={styles.menu}>
            <ButtonIcon icon="home" size={20} buttonStyles={[styles.menuButton]} onPress={handleKey}/>

            <ButtonIcon icon="key" size={20} buttonStyles={[styles.menuButton]} onPress={handleKey}/>

            <ButtonIcon icon="git-compare" size={28} buttonStyles={[styles.menuButton]} onPress={handleAdd}/>

            <ButtonIcon icon="person" size={20} buttonStyles={[styles.menuButton]} onPress={handleAccount}/>

            <ButtonIcon icon="settings" size={20} buttonStyles={[styles.menuButton]} onPress={handleAccount}/>
        </View>
    );
}

const styles = StyleSheet.create({
    menu: {
        width: "96%",
        position: "absolute",
        flexDirection: "row",
        backgroundColor: env.COLORS.MENU,
        marginHorizontal: "2%",
        borderRadius: 50,
        bottom: 10,
    },
    menuButton: {
        borderRadius: 15,
        paddingVertical: 10, 
        width: "20%"
    },
});

export default MenuApp;