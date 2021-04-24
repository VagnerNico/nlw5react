import { createContext, FC, useContext, useEffect, useState } from 'react';

interface ThemeContextData {
  isDark: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextData>({
  isDark: false,
  toggleDarkMode() {
    return;
  },
});

const ThemeContextProvider: FC = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  function toggleDarkMode(): void {
    const newMode = !isDark;
    document.documentElement.className = newMode ? `dark` : ``;
    setIsDark(!isDark);
    localStorage.setItem(`theme`, newMode ? `dark` : `light`);
  }

  useEffect(() => {
    if (window) {
      const storageMode = window.localStorage.getItem(`theme`) === `dark`;
      if (storageMode) {
        setIsDark(window.localStorage.getItem(`theme`) === `dark`);
        document.documentElement.className = storageMode ? `dark` : ``;
      }
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextData => {
  return useContext(ThemeContext);
};

export { ThemeContextProvider, useTheme };
