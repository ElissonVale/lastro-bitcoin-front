import { View, StyleSheet } from "react-native";

type Props = {
    children: any
}

const Header = ({ children }: Props) => {

    return (
        <View style={styles.head}>
            { children }
        </View>
    );
}


const styles = StyleSheet.create({
    head: {
        zIndex: 1,
        width: "100%",
        position: "absolute",
        height: 62,
        top: 0,
    }
});

export default Header;