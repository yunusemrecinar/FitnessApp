import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { useContext, useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import analysisPressed from './assets/icons/analysis-pressed.js';
import Analysis from './assets/icons/analysis.js';
import homePressed from './assets/icons/home-pressed.js';
import HomeIcon from './assets/icons/home.js';
import userPressed from './assets/icons/user-pressed.js';
import User from './assets/icons/user.js';
import workoutsPressed from './assets/icons/workouts-pressed.js';
import Workouts from './assets/icons/workouts.js';
import CustomSplashScreen from './components/ui/CustomSplashScreen';
import IconShare from './components/ui/Icon';
import ForgotPasswordCodeScreen from './screens/ForgotPasswordCodeScreen.js';
import ForgotPasswordLandingScreen from './screens/ForgotPasswordLandingScreen.js';
import ForgotPasswordResetScreen from './screens/ForgotPasswordResetScreen.js';
import HistoryScreen from './screens/HistoryScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPasswordLanding" component={ForgotPasswordLandingScreen} />
      <Stack.Screen name="ForgotPasswordCode" component={ForgotPasswordCodeScreen} />
      <Stack.Screen name="ForgotPasswordReset" component={ForgotPasswordResetScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#29D165',
        tabBarInactiveTintColor: '#9DB2CE'
      }}
    >
      <BottomTabs.Screen 
        name="Home" 
        component={HomeScreen}  
        options={{
          tabBarIcon: ({ size, focused, color}) => {
            return (
              <View style={{ alignItems: 'center' }}>
                <IconShare color={color} width={size} height={size} xmlData={focused ? homePressed : HomeIcon} />
                {focused && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#29D165',
                      position: 'absolute',
                      bottom: -16,  // Adjust the position as needed
                    }}
                  />
                )}
              </View>
            );
          }
        }}
      />
      <BottomTabs.Screen
        name="Workouts"
        component={WorkoutsScreen}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <View style={{ alignItems: 'center' }}>
                <IconShare isFocused={focused} color={color} width={size} height={size} xmlData={focused ? workoutsPressed : Workouts} />
                {focused && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#29D165',
                      position: 'absolute',
                      bottom: -16,  // Adjust the position as needed
                    }}
                  />
                )}
              </View>
            );
          },
        }}
      />
      <BottomTabs.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <View style={{ alignItems: 'center' }}>
                <IconShare color={color} width={size} height={size} xmlData={focused ? analysisPressed : Analysis} />
                {focused && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#29D165',
                      position: 'absolute',
                      bottom: -16,  // Adjust the position as needed
                    }}
                  />
                )}
              </View>
            );
          }
        }}
      />
      <BottomTabs.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <View style={{ alignItems: 'center' }}>
                <IconShare color={color} width={size} height={size} xmlData={focused ? userPressed : User} />
                {focused && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#29D165',
                      position: 'absolute',
                      bottom: -16,  // Adjust the position as needed
                    }}
                  />
                )}
              </View>
            )
          }
        }}
        />
    </BottomTabs.Navigator>
  )
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        setIsAuthenticated(true);
        authCtx.authenticate(storedToken);
      }

      setIsLoading(false);
    }

    fetchToken();
  }, []);

  if (isLoading) {
    return <CustomSplashScreen />;
  }
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'AuthenticatedStack' : 'AuthStack'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthenticatedStack"
          component={AuthenticatedStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Root() {
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