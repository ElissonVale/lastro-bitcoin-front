import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MenuApp = {
    addClick: () => void,
    countClick: () => void,
    keyClick: () => void
}

const MenuApp = (props: MenuApp) => {
    return (
        <View style={styles.menu}>
            {/* <TouchableOpacity style={[styles.menuButton, styles.leftOne]}>
                <Ionicons name="ios-home" size={20} color="white" style={{ textAlign: "center", padding: 18 }} />
            </TouchableOpacity> */}
            <TouchableOpacity style={[styles.menuButton, styles.left]} onPress={props.keyClick}>
                <Ionicons name="key" size={20} color="white" style={{ textAlign: "center", padding: 18 }} />
            </TouchableOpacity>            
            <TouchableOpacity style={[styles.menuButton, styles.center]} onPress={props.addClick}>
                <Ionicons name="add" size={28} color="white" style={{ textAlign: "center", padding: 18 }} />
            </TouchableOpacity>            
            <TouchableOpacity style={[styles.menuButton, styles.right]} onPress={props.countClick}>
                <Ionicons name="person" size={20} color="white" style={{ textAlign: "center", padding: 18 }} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={[styles.menuButton, styles.rightOne]}>
                <Ionicons name="person" size={20} color="white" style={{ textAlign: "center", padding: 18 }} />
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    menu: {
        zIndex: 999,
        width: "100%",
        position: "absolute",
        backgroundColor: "rgba(255,255,255, .05)",
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
    right: { right: 40 }, // { right: 80 },
    rightOne: { right: 10 },
    center: { top: -45, left: "40%", right: "40%", backgroundColor: "#454545", borderColor: "black", borderWidth: 10, borderRadius: 50 },    
    leftOne: { left: 10 }, 
    left: { left: 40 } //{ left: 80 }
});

export default  MenuApp;