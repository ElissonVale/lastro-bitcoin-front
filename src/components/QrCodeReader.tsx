import Modal from 'react-native-modal';
import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  visible: boolean,
  setValue: (data: string) => void,
  runClose: (value: boolean) => void,
}

export default function QRCodeReaderModal(props: Props) {

  const [hasPermission, setHasPermission] = useState(false);
  
  const requestPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync(); 
      setHasPermission(status === 'granted');
  }

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: any, data: any}) => {
    props.runClose(false);
    props.setValue(data); 
  };
    
  return (
    <Modal isVisible={props.visible} style={styles.modal}>
      <View style={styles.container}>

        <TouchableOpacity onPress={() => { props.runClose(false); }} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="white" style={{ textAlign: "center", padding: 10 }} />
        </TouchableOpacity>

        <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={styles.scanner}>
          <View style={styles.framecode}></View>
        </BarCodeScanner>
      </View>
    </Modal>
  );
}

    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    scanText: {
      fontSize: 18,
      margin: 20,
      textAlign: 'center',
      color: "#fff"
    },
    scanner: {
        flex: 1,
        backgroundColor: "transparent",
        width: "100%",
        height: "100%",
        borderRadius: 20
    }, 
    framecode: {
        backgroundColor: "rgba(255, 255, 255, .2)",
        width: 150,
        height: 150,
        borderRadius: 10,
        position: "absolute",
        top: "38%",
        right: "28%"
    },
    modal: {
      backgroundColor: "rgba(0,0,0,.8)"
    },
    closeButton: {
      position: "absolute",
      bottom: 0,
      right: "43%",
      borderWidth: 1,
      borderColor: "white",
      padding: 0,
      borderRadius: 30,
      zIndex: 999
    }
  });