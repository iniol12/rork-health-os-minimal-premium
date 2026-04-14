import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { darkColors, lightColors, ThemeColors } from '@/constants/colors';

export type ThemeMode = 'dark' | 'light';

const THEME_STORAGE_KEY = 'clariohealth_theme';

export const [ThemeProvider, useTheme] = createContextHook(() => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark') {
        setMode(stored);
      }
      setIsLoaded(true);
    }).catch(() => {
      setIsLoaded(true);
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const next: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      AsyncStorage.setItem(THEME_STORAGE_KEY, next).catch(() => {
        console.log('[ThemeContext] Failed to persist theme');
      });
      return next;
    });
  }, []);

  const setTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
    AsyncStorage.setItem(THEME_STORAGE_KEY, newMode).catch(() => {
      console.log('[ThemeContext] Failed to persist theme');
    });
  }, []);

  const colors: ThemeColors = useMemo(() => {
    return mode === 'dark' ? darkColors : lightColors;
  }, [mode]);

  const isDark = mode === 'dark';

  return { mode, isDark, colors, toggleTheme, setTheme, isLoaded };
});
