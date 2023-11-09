import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import env from '../../app.configs';

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

const ButtonHead = (params: Props) => {
    return (
    <TouchableOpacity style={[styles.button, styles.ButtonDefault]} onPress={params.onPress}>
        <Text style={styles.buttonText}>{params.title}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        paddingVertical: 18,       
        borderRadius: 24, 
        borderWidth: 0,
    },
    buttonSuccess: {
        backgroundColor: env.COLORS.GREEN,
    },
    buttonPrimary: {
        backgroundColor: env.COLORS.BLUE,
    },
    buttonDanger: {
        backgroundColor: env.COLORS.RED,
    },
    ButtonDefault: {
        backgroundColor: env.COLORS.GRAY,
    },
    buttonText: {
        color: env.COLORS.WHITE,
        padding: 0,
        fontSize: 14,
        fontWeight: "500",
        textAlign: 'center'
    }
});

export {ButtonSuccess, ButtonPrimary, ButtonDanger, ButtonDefault};