import React, {useCallback, useState, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';
import {useDarkModeContext} from 'react-native-dark-mode';

import lightTheme from './themes/light';
import darkTheme from './themes/dark';

import Home from './pages/Home';

export default function App() {
  const deviceTheme = useDarkModeContext();
  const [theme, setTheme] = useState(
    deviceTheme === 'light' ? lightTheme : darkTheme,
  );

  useEffect(() => {
    async function getPersistedTheme() {
      const persistedTheme = await AsyncStorage.getItem('theme');

      if (persistedTheme) {
        setTheme(persistedTheme === 'light' ? lightTheme : darkTheme);
      }
    }

    getPersistedTheme();
  }, []);

  const persistTheme = useCallback(async themeToPersist => {
    setTheme(themeToPersist === 'light' ? lightTheme : darkTheme);
    await AsyncStorage.setItem('theme', themeToPersist);
  }, []);

  useEffect(() => {
    persistTheme(deviceTheme);
  }, [deviceTheme, persistTheme]);

  const toggleTheme = useCallback(() => {
    persistTheme(theme.title === 'light' ? 'dark' : 'light');
  }, [theme.title, persistTheme]);

  return (
    <ThemeProvider theme={theme}>
      <Home toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}
