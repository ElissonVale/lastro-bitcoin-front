import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
      },
    title: {
      color: "#fff"
    },
    input: {
      width: "90%",
      color: "#FFF",
      borderColor: "#FFF",
      borderWidth: 1,
      paddingHorizontal: 30,
      paddingVertical: 20,
      borderRadius: 50,
      margin: 10
    },
    containerDescription: {
      width: "90%",
      backgroundColor: "#BDBDBD",
      borderRadius: 10,
      padding: 20,
      marginTop: -50,
      margin: 15
    },
    description: {
      fontSize: 14,
      fontWeight: "300",
      textAlign: "center",
      color: "#333333"
    }
});