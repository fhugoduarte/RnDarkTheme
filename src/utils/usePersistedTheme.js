import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useDarkModeContext} from 'react-native-dark-mode';

import lightTheme from '../themes/light';
import darkTheme from '../themes/dark';

function usePersistedTheme() {
  // const deviceTheme = useDarkModeContext();

  const [theme, setTheme] = useState(async () => {
    try {
      const persistedTheme = await AsyncStorage.getItem('theme');
      console.warn({persistedTheme});

      if (persistedTheme) {
        return persistedTheme === 'light' ? lightTheme : darkTheme;
      }

      return lightTheme;
    } catch (error) {
      console.warn('error', error);
      return lightTheme;
    }
  });

  useEffect(() => {
    async function setDeviceTheme() {
      console.warn({theme});
      // await AsyncStorage.setItem('theme', theme);
    }

    setDeviceTheme();
  }, [theme]);

  // useEffect(() => {
  //   async function setDeviceTheme() {
  //     await AsyncStorage.setItem('theme', deviceTheme);
  //   }

  //   setDeviceTheme();
  // }, [deviceTheme]);

  return [theme, setTheme];
}

export default usePersistedTheme;
