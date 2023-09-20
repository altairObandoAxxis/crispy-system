import React from 'react';
import PolicyList from './PolicyList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Coverages } from './Coverages';
import { Requirements } from './Requirements';
import { Documents } from './Documents';


const PolicyStack = createNativeStackNavigator();


export const Index = () => {
  return <PolicyStack.Navigator initialRouteName='PolicyList'>
    <PolicyStack.Screen name='PolicyList' component={ PolicyList }   options={{ headerShown: false }} />
    <PolicyStack.Screen name='Coverages'  component={ Coverages }    options={{ title:'Policy Coverages'}}/>
    <PolicyStack.Screen name='Requirement'component={ Requirements } options={{ title: 'Policy Requirements' }} />
    <PolicyStack.Screen name='Document'   component={ Documents }    options={{ title: 'Policy Documents' }} />
    <PolicyStack.Screen name='DocumentViewer' component={ DocumentViewer }    options={{ title: 'Document' }} />
  </PolicyStack.Navigator>
}
