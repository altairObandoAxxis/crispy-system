import { Platform, StatusBar } from 'react-native';
import { lightColors, createTheme, ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { IndexStack } from './Screens';
import { UserProvider } from './util/UserContext';
const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle='light-content' backgroundColor='rgb(0, 120, 212)'/>
      <SafeAreaProvider>
          <UserProvider>
            <IndexStack />
          </UserProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}