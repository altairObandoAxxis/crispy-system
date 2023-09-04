import * as SecureStore from 'expo-secure-store';
export const saveValueFor = async ({ key, value })=> await SecureStore.setItemAsync(key, value );
export const getValueFor  = async ({ key, f= '' }) =>await SecureStore.getItemAsync(key) || f;