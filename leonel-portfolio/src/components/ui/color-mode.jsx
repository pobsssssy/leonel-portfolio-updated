import { ThemeProvider, useTheme } from "next-themes";

/**
 * Chakra UI v3 delegates light/dark mode state to next-themes.
 * The portfolio starts in dark mode and remembers the visitor's choice.
 */
export function ColorModeProvider({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="leonel-portfolio-theme"
    >
      {children}
    </ThemeProvider>
  );
}

export function useColorMode() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const colorMode = theme === "system" ? resolvedTheme : theme;

  return {
    colorMode: colorMode === "light" ? "light" : "dark",
    setColorMode: setTheme,
    toggleColorMode: () => {
      setTheme(colorMode === "dark" ? "light" : "dark");
    },
  };
}
