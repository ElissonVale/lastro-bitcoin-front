import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import InitialPage from './pages/Initial';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Initialize">
          <Stack.Screen name="Initialize" component={InitialPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


export default Navigation;
