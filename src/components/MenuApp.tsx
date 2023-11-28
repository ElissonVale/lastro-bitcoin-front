import { StyleSheet, View } from 'react-native';
import { ButtonIcon } from '../components/Buttons'
import env from '../../app.configs';

type MenuApp = {
    addClick: () => void,
    countClick: () => void,
    keyClick: () => void
}

const MenuApp = ({ addClick, countClick, keyClick }: MenuApp) => {
    return (
        <View style={styles.menu}>

            <ButtonIcon icon="home" size={20} buttonStyles={[styles.menuButton, styles.leftOne]} iconStyles={[{ textAlign: "center", padding: 18 }]} onPress={keyClick}/>

            <ButtonIcon icon="key" size={20} buttonStyles={[styles.menuButton, styles.left]} iconStyles={[{ textAlign: "center", padding: 18 }]} onPress={keyClick}/>

            <ButtonIcon icon="add" size={28} buttonStyles={[styles.menuButton, styles.center]} iconStyles={[{ textAlign: "center", padding: 18 }]} onPress={addClick}/>

            <ButtonIcon icon="person" size={20} buttonStyles={[styles.menuButton, styles.right]} iconStyles={[{ textAlign: "center", padding: 18 }]} onPress={countClick}/>

            <ButtonIcon icon="home" size={20} buttonStyles={[styles.menuButton, styles.rightOne]} iconStyles={[{ textAlign: "center", padding: 18 }]} onPress={keyClick}/>

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