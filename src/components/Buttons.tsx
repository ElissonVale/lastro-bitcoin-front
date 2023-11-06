import { TouchableOpacity, StyleSheet, Text } from 'react-native';

type Props = {
    title: string,
    onPress: () => void 
};

const ButtonSuccess = (params: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.buttonSuccess]} onPress={params.onPress}>
            <Text style={styles.buttonText}>{params.title}</Text>
        </TouchableOpacity>
    );
}

const ButtonPrimary = (params: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={params.onPress}>
            <Text style={styles.buttonText}>{params.title}</Text>
        </TouchableOpacity>
    );
}

const ButtonDanger = (params: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={params.onPress}>
            <Text style={styles.buttonText}>{params.title}</Text>
        </TouchableOpacity>
    );
}

const ButtonDefault = (params: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.ButtonDefault]} onPress={params.onPress}>
            <Text style={styles.buttonText}>{params.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        backgroundColor: "transparent",
        paddingVertical: 18,       
        borderRadius: 30, 
        borderWidth: 1
    },
    buttonSuccess: {
        borderColor: "#27AE60",
    },
    buttonPrimary: {
        borderColor: "#2D9CDB",
    },
    buttonDanger: {
        borderColor: "#EB5757",
    },
    ButtonDefault: {
        borderColor: "#FFF",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "400",
        textAlign: 'center'
    }
});

export {ButtonSuccess, ButtonPrimary, ButtonDanger, ButtonDefault};