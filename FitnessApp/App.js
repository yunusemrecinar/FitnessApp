import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import CustomSplashScreen from './components/ui/CustomSplashScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
    }

    fetchToken();
  }, []);

  return <Navigation />;
}

const App = () => {
  const[fontsLoaded] = useFonts({
    'baloo-regular': require('./assets/fonts/BalooBhaijaan2-Medium.ttf'),
    'baloo-semiBold': require('./assets/fonts/BalooBhaijaan2-SemiBold.ttf'),
    'baloo-bold': require('./assets/fonts/BalooBhaijaan2-Bold.ttf'),
  });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if(fontsLoaded) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        {showSplash ? <CustomSplashScreen /> : <Root />}
      </AuthContextProvider>
    </>
  );
};

export default App;