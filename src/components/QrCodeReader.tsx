import Modal from 'react-native-modal';
import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';
import env from '../../app.configs';

type Props = {
  visible: boolean,
  setValue: (data: string) => void,
  runClose: (value: boolean) => void,
}

export default function QRCodeReaderModal({ visible, setValue, runClose }: Props) {

  const [hasPermission, setHasPermission] = useState(false);
  
  const requestPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync(); 
      setHasPermission(status === 'granted');
  }

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: any, data: any}) => {
    runClose(false);
    setValue(data); 
  };
    
  return (
    <Modal isVisible={visible} style={styles.modal} animationIn={"slideInUp"}>
      <View style={styles.container} >

        <TouchableOpacity onPress={() => { runClose(false); }} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="white" style={{ textAlign: "center", padding: 10 }} />
        </TouchableOpacity>

        <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={styles.scanner}>
          <View style={styles.frameCode}></View>
        </BarCodeScanner>
      </View>
    </Modal>
  );
}

    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: env.COLORS.BLACK,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scanner: {
      flex: 1,
      backgroundColor: "transparent",
      width: "100%",
      height: "100%",
      borderRadius: 20
  }, 
  frameCode: {
      backgroundColor: "rgba(255, 255, 255, .2)",
      width: 150,
      height: 150,
      borderRadius: 10,
      position: "absolute",
      top: "38%",
      right: "28%"
  },
  modal: {
    flex: 1,
    backgroundColor: env.COLORS.BLACK
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