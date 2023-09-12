import React from 'react';
import PolicyList from './PolicyList';
import { PolicyDetails } from './PolicyDetails';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const Index = () => {
  return <SafeAreaProvider>
    <PolicyList />
    <PolicyDetails />
  </SafeAreaProvider>
}
