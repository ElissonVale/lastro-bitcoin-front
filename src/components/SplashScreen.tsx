import { StyleSheet, View, Text, ActivityIndicator, Image } from "react-native";
import env from "../../app.configs";

type Props = {
    message?: string
}

const Splashscreen = ({ message }: Props) => {

    return (
        <View style={styles.container}>

            <Image style={styles.logo} source={require("../../assets/logo.png")} />
            
            <ActivityIndicator style={styles.load} size={50} color={"white"}></ActivityIndicator>
            
            { !!message && <Text style={styles.message}>{message}</Text> }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: env.COLORS.BLACK,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
        maxWidth: "80%",
        height: "25%",
        marginTop: -100
    },
    load: {
        margin: 30
    },
    message: {
        color: env.COLORS.WHITE,
        backgroundColor: "rgba(255, 255, 255, .1)",
        maxWidth: "80%",
        padding: 10,
        borderRadius: 10,
        position: "absolute",
        bottom: 100
    }
});

export default Splashscreen;
