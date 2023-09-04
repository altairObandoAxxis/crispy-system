import React, { useEffect, useContext } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import { UserContext } from '../util/UserContext';
import { getLoginToken, logout } from '../util/login';
import { LoginStack    } from './Login/index'


const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return <View>
    <Text> Pagina de inicio </Text>
    <Button
      title='Go to details'
      onPress={() => navigation.navigate('Profile', { token: 'abc' })}
    />
  </View>
}

const ProfileScreen = ({ navigation, route }) => (
  <View>
    <Text> Pagina de Usuario {route.params.token}</Text>
  </View>
);

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name='Profile' component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

SplashScreen.preventAutoHideAsync();
export const IndexStack = () => {
  const userContext = React.useContext(UserContext);
  const validateLogin = async () => {
    const token = await getLoginToken();
    const logged = !(typeof token === 'undefined' || token === null || !token);
    userContext.setData({ userLogged: logged });
  };

  // Show splash art
  useEffect(() => {
    async function loadApp() {
      try {
        await validateLogin();
      } catch (error) {
        console.warn(error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    loadApp();
  }, []);
  return (
    <View
        style={{ flex: 1 }}>
        {userContext.state.userLogged  && <HomeStack />}
        {!userContext.state.userLogged && <LoginStack />}
    </View>
  );
};
