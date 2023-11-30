import { StyleSheet, View, Text } from "react-native";
import Styles from "../../stylesheet/Styles";
import env from "../../../app.configs";

type Props = {
    founds: string
}

const Founds = ({ founds } : Props) => {
    
    return (
        <>
            <View style={[Styles.container, styles.container_founds]}>
                <View style={[Styles.container, { width: "100%" }]}>
                    <Text style={styles.founds}> {founds} </Text>
                    <Text style={styles.found_tag}> {"Sats"} </Text>
                </View>

                <View style={Styles.separator}></View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container_founds: {
        width: "100%",
        marginTop: 80,
        marginBottom: 10,
        padding: 10,
    },
    found_tag: {
        color: env.COLORS.GREEN,
        fontSize: 18
    },
    founds: {
        width: "100%",
        textAlign: "center",
        color: env.COLORS.GRAY,
        fontSize: 35,
        fontWeight: "900"
    },
});

export default Founds;