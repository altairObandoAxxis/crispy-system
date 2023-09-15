import React from 'react';
import PolicyList from './PolicyList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Coverages } from './Coverages';


const PolicyStack = createNativeStackNavigator();


export const Index = () => {
  return <PolicyStack.Navigator>
    <PolicyStack.Screen name='PolicyList' component={ PolicyList } options={{ headerShown: false }} />
    <PolicyStack.Screen name='Coverages'  component={ Coverages } />
  </PolicyStack.Navigator>
}
