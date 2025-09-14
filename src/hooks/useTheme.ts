import { useTheme as useThemeContext } from '@/contexts/ThemeContext';

export const useTheme = () => {
  const { theme, setTheme, resolvedTheme } = useThemeContext();
  
  const isDark = resolvedTheme === 'dark';
  const isLight = resolvedTheme === 'light';
  const isSystem = theme === 'system';
  
  return {
    theme,
    setTheme,
    resolvedTheme,
    isDark,
    isLight,
    isSystem,
  };
};
