import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';

export const useThemeEffect = () => {
  const { isDark } = useThemeStore();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
};