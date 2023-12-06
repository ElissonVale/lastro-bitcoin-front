import { StatusBar } from 'expo-status-bar';
import Navigation from './src/Navegation';

export default function App() {
  return (
    <>
      <StatusBar translucent hidden={true} backgroundColor='transparent'/>
      <Navigation></Navigation>
    </>
  );
}

