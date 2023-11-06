
import { StyleSheet, Text, View, Button } from 'react-native';

const MenuApp = () => {
    return (
        <View style={styles.menu}>
            <Text>Menu app</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    menu: {
        backgroundColor: "red",
        position: "absolute",
        bottom: 0,
        margin: 0,
        width: "100%",
        padding: 0
    },
    menuButton: {

    }
});

export default  MenuApp;