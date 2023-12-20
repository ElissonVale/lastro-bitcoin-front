import { StatusBar } from 'expo-status-bar';
import Navigation from './src/Navegation';
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <StatusBar translucent={true} hidden={true} />
      <Navigation></Navigation>
    </View>
  );
}

