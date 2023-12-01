import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import env from "../../app.configs";
import { ButtonDanger } from "./Buttons";

type typeMessage = "alert" | "error" | "success";

type alertBoxProps = {
    title?: string,
    message: string,
    type?: typeMessage
}

var showMessageFunction: (config: alertBoxProps) => void;

const MessageBox = () => {

    const [title, setTitle] = useState<string>();
    const [type, setType] = useState<typeMessage>();
    const [message, setMessage] = useState<string>();
    const [baseColor, setBaseColor] = useState<string>(env.COLORS.RED);
    
    const [visible, setVisible] = useState(false);

    showMessageFunction = ({ title, message, type } : alertBoxProps) => {
        setType(type);
        setTitle(title);
        setMessage(message);
        setVisible(true);
    }

    const handleClose = () => {
        setVisible(false);
    }

    useEffect(() => { 
        switch(type) {
            case "alert":
                setBaseColor(env.COLORS.GRAY)
                break;
            case "success":
                setBaseColor(env.COLORS.GREEN);
                break;
        }
    }, [visible]);

    return (
        <Modal animationType="slide" onRequestClose={handleClose} transparent={true} statusBarTranslucent={true} visible={visible}>
            <View style={styles.box}>

                <Text style={{ color: baseColor, fontSize: 62, fontWeight: 'bold'}}> { title ?? "Oops!" } </Text>

                <Text style={styles.message}> {message} </Text>

                <ButtonDanger title="Close" style={{ minWidth: 120 }} onPress={handleClose} />

            </View>
        </Modal>
    );
}

export const showMessage = (config: alertBoxProps) => {
    setTimeout(() => { showMessageFunction(config) }, 100);
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: env.COLORS.TRANSPARENT
    },
    message: {
        fontSize: 16,
        paddingHorizontal: 5,
        paddingVertical: 50,
        marginVertical: 30,
        marginHorizontal: 15,
        color: env.COLORS.WHITE,
        textAlign: 'center'
    }
});

export default MessageBox;