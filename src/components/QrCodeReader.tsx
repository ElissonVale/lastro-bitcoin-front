import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

type Props = {
  onRead: (data: boolean) => void,
  setValue: (data: string) => void
}

export default function QRCodeReader(props: Props) {

    const [hasPermission, setHasPermission] = useState(false);

    const [scanned, setScanned] = useState(false);
  
    const requestPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync(); 
        setHasPermission(status === 'granted');
    }

    useEffect(() => {
      requestPermission();
    }, [hasPermission, scanned]);
  
    const handleBarCodeScanned = ({ type, data }: { type: any, data: any}) => {
      setScanned(true);
      props.setValue(data);
      props.onRead(true);
    };
    
    return (
      <View style={styles.container}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.scanner}>
          <View style={styles.framecode}></View>
        </BarCodeScanner>
      </View>
    );
}

    
const styles = StyleSheet.create({
    container: {
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
        padding: 0,
        backgroundColor: "transparent",
        width: 300,
        height: 200
    }, 
    framecode: {
        borderBlockColor: "black",
        borderWidth: 1,
        width: 50,
        height: 50,
        margin: "auto",
        borderRadius: 5,
        position: "absolute",
        top: "30%",
        right: "42%"
    }
  });