import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import InitialPage from './pages/Initial';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';

import Account from './pages/root/Account';
import KeyManager from './pages/root/KeyManager';
import TokenAccess from './pages/root/TokenAccess';
import VerifyToken from './pages/root/VerifyToken';

import { Transaction } from './pages/bank/Transaction';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, headerTransparent: true, cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter }} initialRouteName="Initialize" >
        <Stack.Screen name="Initialize" component={InitialPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="TokenAccess" component={TokenAccess} />
        <Stack.Screen name="VerifyToken" component={VerifyToken} />

        <Stack.Screen name="Home" component={HomePage} />

        <Stack.Screen name="KeyManager" component={KeyManager} />
        <Stack.Screen name="Account" component={Account} />

        <Stack.Screen name="Transaction" component={Transaction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default Navigation;
