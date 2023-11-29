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

            <ButtonIcon icon="home" size={20} buttonStyles={[styles.menuButton, styles.leftOne]} onPress={handleKey}/>

            <ButtonIcon icon="key" size={20} buttonStyles={[styles.menuButton, styles.left]} onPress={handleKey}/>

            <ButtonIcon icon="git-compare" size={28} buttonStyles={[styles.menuButton, styles.center]} iconStyle={{ padding: 18 }} onPress={handleAdd}/>

            <ButtonIcon icon="person" size={20} buttonStyles={[styles.menuButton, styles.right]} onPress={handleAccount}/>

            <ButtonIcon icon="settings" size={20} buttonStyles={[styles.menuButton, styles.rightOne]} onPress={handleAccount}/>

        </View>
    );
}

const styles = StyleSheet.create({
    menu: {
        zIndex: 999,
        width: "100%",
        position: "absolute",
        backgroundColor: env.COLORS.MENU,
        borderRadius: 20,
        bottom: 0,
        height: 90,
        padding: 5,
    },
    menuButton: {
        top: 10,
        zIndex: 9999,
        borderRadius: 15,
        position: "absolute",
    },
    right: { right: 80 },
    rightOne: { right: 10 },
    center: { top: -45, left: "40%", right: "40%", backgroundColor: env.COLORS.MENU, borderColor: "black", borderWidth: 10, borderRadius: 50 },
    leftOne: { left: 10 },
    left: { left: 80 }
});

export default MenuApp;