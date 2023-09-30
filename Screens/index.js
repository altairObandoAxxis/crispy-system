import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { UserContext } from '../util/UserContext';
import { getLoginToken, getUserInfo } from '../util/login';
import { LoginStack    } from './Login/index'
import { IndexTabs     } from './Home';
import { GetContact } from '../commands/Contact';
import { NavigationContainer } from '@react-navigation/native';
import { NoContact } from '../Components/Account/NoContact';


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
    setData(current => ({...current, userLogged: logged, user, contact }));
  };

  // Show splash art
  useEffect(() => {
    async function loadApp() {
      try {
        await validateLogin();
      } catch (error) {
        console.warn(error);
      } finally {
        setTimeout( ()=> SplashScreen.hideAsync(), 1000);
      }
    }
    loadApp();
  }, [ userState.contact ]);
  
  if(!userState.userLogged)
    return <NavigationContainer style={{ flex: 1 }}>
      <LoginStack />
    </NavigationContainer>
  if(userState.contact)
    return <NavigationContainer style={{ flex: 1 }}>
      <IndexTabs />
    </NavigationContainer>

  return <NoContact />
};
