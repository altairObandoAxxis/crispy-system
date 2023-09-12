import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateUser } from './CreateUser';
import { ForgotPassword } from './ForgotPassword';
import { Login } from './Login'

const Stack = createNativeStackNavigator()


export const LoginStack =()=> <Stack.Navigator>
    <Stack.Screen name='Login' component={ Login } options={{ title: 'Welcome to SISos', headerShown: false, headerTitleAlign:'center' }} />
    <Stack.Screen name='CreateUser' component={ CreateUser } options={{ title: 'Register' }} />
    <Stack.Screen name='ForgotPassword' component={ ForgotPassword } options={{ title: 'Recover Password' }} />
</Stack.Navigator>