import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateUser } from './CreateUser';
import { ForgotPassword } from './ForgotPassword';
import { Login } from './Login'

const Stack = createNativeStackNavigator()


export const LoginStack =()=> <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='Login' component={ Login } options={{ title: 'Welcome to SISos', headerShown: true, headerTitleAlign:'center' }} />
        <Stack.Screen name='CreateUser' component={ CreateUser } options={{ title: 'Register' }} />
        <Stack.Screen name='ForgotPassword' component={ ForgotPassword } options={{ title: 'Recover Password' }} />
    </Stack.Navigator>
</NavigationContainer>