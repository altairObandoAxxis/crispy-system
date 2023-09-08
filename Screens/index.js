import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { UserContext } from '../util/UserContext';
import { getLoginToken, getUserInfo } from '../util/login';
import { LoginStack    } from './Login/index'
import { IndexTabs     } from './Home';
import { GetContact } from '../commands/Contact';


SplashScreen.preventAutoHideAsync();
export const IndexStack = () => {
  const { state: userState, setData } = React.useContext(UserContext);
  const validateLogin = async () => {
    const token = await getLoginToken();
    if(!token)
      return;
    const user  = await getUserInfo();
    const contact = await GetContact();
    const logged = !(typeof token === 'undefined' || token === null || !token);
    setData({ userLogged: logged, user, contact });
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
        {userState.userLogged  && <IndexTabs />}
        {!userState.userLogged && <LoginStack />}
    </View>
  );
};
