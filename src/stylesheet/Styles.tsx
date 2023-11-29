import { StyleSheet } from 'react-native';
import env from '../../app.configs';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: env.COLORS.BLACK,
        alignItems: 'center',
        justifyContent: 'center',
      },
    title: {
      color: env.COLORS.WHITE
    },
    input: {
      width: "90%",
      color: env.COLORS.WHITE,
      borderColor: env.COLORS.WHITE,
      backgroundColor: env.COLORS.DEFAULT,
      paddingHorizontal: 30,
      paddingVertical: 20,
      borderRadius: 20,
      margin: 10
    },
    containerDescription: {
      width: "90%",
      backgroundColor: env.COLORS.GRAY,
      borderRadius: 10,
      padding: 20,
      marginTop: -50,
      margin: 15
    },
    description: {
      fontSize: 14,
      fontWeight: "300",
      textAlign: "center",
      color: env.COLORS.WHITE
    },
    separator: {
      width: "70%", 
      height: 0, 
      padding: 0, 
      marginTop: 20, 
      borderColor: env.COLORS.GRAY, 
      backgroundColor: env.COLORS.GRAY, 
      borderWidth: 2,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50
    },
    endPage: {
        width: "30%", 
        height: 0, 
        padding: 0, 
        marginTop: 20, 
        borderColor: env.COLORS.GRAY, 
        backgroundColor: env.COLORS.GRAY, 
        borderWidth: 1
    }
});