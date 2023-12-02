import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import env from '../../app.configs';
import { StyleProp } from 'react-native';
import { TextStyle } from 'react-native';

type Props = {
    title: string,
    icon?: "add" | "add-circle" | "arrow-forward-circle" | "trash" | "bookmarks",
    style?: StyleProp<TextStyle>,
    onPress: () => void
};

const ButtonSuccess = ({ title, style, icon, onPress }: Props) => {

    return (
        <TouchableOpacity style={[styles.button, styles.buttonSuccess, style]} onPress={onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.buttonText}> {title} </Text>
                {icon &&  <Ionicons name={icon} size={18} style={styles.icon} color={env.COLORS.ICONS} /> }
            </View>
        </TouchableOpacity>
    );
}

const ButtonPrimary = ({ title, style, icon, onPress }: Props) => {

    return (
        <TouchableOpacity style={[styles.button, styles.buttonPrimary, style]} onPress={onPress}>
           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.buttonText}> {title} </Text>
                {icon && <Ionicons name={icon} size={18} color={env.COLORS.ICONS} /> }
            </View>       
        </TouchableOpacity>
    );
}

const ButtonDanger = ({ title, style, icon, onPress }: Props) => {

    return (
        <TouchableOpacity style={[styles.button, styles.buttonDanger, style]} onPress={onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.buttonText}> {title} </Text>
                {icon && <Ionicons name={icon} size={18} color={env.COLORS.ICONS} /> }
            </View>
        </TouchableOpacity>
    );
}

const ButtonDefault = ({ title, style, icon, onPress }: Props) => {

    return (
        <TouchableOpacity style={[styles.button, styles.ButtonDefault, style]} onPress={onPress}>
           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.buttonText}> {title} </Text>
                {icon && <Ionicons name={icon} size={18} color={env.COLORS.ICONS} /> }
            </View>
        </TouchableOpacity>
    );
}

const ButtonHead = ({ title, style, icon, onPress }: Props) => {

    return (
        <TouchableOpacity style={[styles.button, styles.ButtonDefault, style]} onPress={onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.buttonText}> {title} </Text>
                {icon && <Ionicons name={icon} size={18} color={env.COLORS.ICONS} /> }
            </View>        
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
        fontSize: 14,
        fontWeight: "500",
        textAlign: 'center',
        marginHorizontal: 10
    },
    icon: {
        marginHorizontal: 10
    }
});

export { ButtonSuccess, ButtonPrimary, ButtonDanger, ButtonDefault, ButtonIcon };