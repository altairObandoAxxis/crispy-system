import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { UserContext } from '../util/UserContext';
import { getLoginToken, getUserInfo } from '../util/login';
import { LoginStack    } from './Login/index'
import { IndexTabs     } from './Home';


SplashScreen.preventAutoHideAsync();
export const IndexStack = () => {
  const userContext = React.useContext(UserContext);
  const validateLogin = async () => {
    const token = await getLoginToken();
    const user  = JSON.parse(await getUserInfo());
    const logged = !(typeof token === 'undefined' || token === null || !token);
    userContext.setData({ userLogged: logged, userInfo: user });
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
        {userContext.state.userLogged  && <IndexTabs />}
        {!userContext.state.userLogged && <LoginStack />}
    </View>
  );
};
