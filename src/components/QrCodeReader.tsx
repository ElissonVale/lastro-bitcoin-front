import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
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
    <Modal visible={visible}  animationType="slide" statusBarTranslucent={true} transparent={true} onRequestClose={() => { runClose(false) }}>
      <View style={styles.container}>
        <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={[styles.scanner, {...StyleSheet.absoluteFillObject}]} >
          
          <View style={styles.frameCode}></View>

          <TouchableOpacity onPress={() => { runClose(false); }} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="white" style={{ textAlign: "center", padding: 10 }} />
          </TouchableOpacity>

        </BarCodeScanner>
      </View>
    </Modal>
  );
}

    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: env.COLORS.BLACK
  },
  scanner: {
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  frameCode: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, .2)",
  },
  closeButton: {
    borderWidth: 1,
    borderColor: env.COLORS.WHITE,
    borderRadius: 50,
    position: 'absolute',
    bottom: 80
  }
});