import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import env from '../../app.configs';

type Props = {
    title: string,
    onPress: () => void
};

const ButtonSuccess = ({ title, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.buttonSuccess]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const ButtonPrimary = ({ title, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const ButtonDanger = ({ title, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const ButtonDefault = ({ title, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.ButtonDefault]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const ButtonHead = ({ title, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.ButtonDefault]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

type IconProps = {
    icon: any,
    size: number | undefined,
    iconStyles: Array<{}> | undefined,
    buttonStyles: Array<{}> | undefined,
    onPress: () => void
};

const ButtonIcon = ({ icon, size, iconStyles, buttonStyles, onPress }: IconProps) => {

    size = size ? size : 20;
    icon = icon ? icon : "add";

    return (
        <TouchableOpacity style={buttonStyles} onPress={onPress}>
            <Ionicons name={icon} size={size} color={env.COLORS.ICONS} style={iconStyles} />
        </TouchableOpacity>
    );
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

export { ButtonSuccess, ButtonPrimary, ButtonDanger, ButtonDefault, ButtonIcon };