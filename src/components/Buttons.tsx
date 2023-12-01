import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import env from '../../app.configs';
import { StyleProp } from 'react-native';
import { TextStyle } from 'react-native';

type Props = {
    title: string,
    style?: StyleProp<TextStyle>,
    onPress: () => void
};

const ButtonSuccess = ({ title, style, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.buttonSuccess, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const ButtonPrimary = ({ title, style, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.buttonPrimary, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const ButtonDanger = ({ title, style, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.buttonDanger, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const ButtonDefault = ({ title, style, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.ButtonDefault, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const ButtonHead = ({ title, style, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, styles.ButtonDefault, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

type IconProps = {
    icon: any,
    size?: number | undefined,
    iconStyle?: {} | undefined,
    buttonStyles: Array<{}> | undefined,
    onPress: () => void
};

const ButtonIcon = ({ icon, size, iconStyle, buttonStyles, onPress }: IconProps) => {

    size = size ? size : 20;
    iconStyle = iconStyle ? iconStyle : { textAlign: "center", padding: 12 };

    /**
   * See Icon Explorer app
   * {@link https://expo.github.io/vector-icons/}
   */
    return (
        <TouchableOpacity style={buttonStyles} onPress={onPress}>
            <Ionicons name={icon} size={size} color={env.COLORS.ICONS} style={iconStyle} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        paddingVertical: 18,
        borderRadius: 28,
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