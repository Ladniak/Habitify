import React, { createContext, useContext, useState, ReactNode } from "react";

const lightTheme = {
  background: "#FFFFFF",
  text: "#1C1C1C",
  subtext: "#666",
  card: "#F3F3F3",
  primary: "#4E6EFD",
  danger: "#E53935",
  shadow: "#000000",
  border: "#E0E0E0",
};

const darkTheme = {
  background: "#1E1E1E",
  text: "#FFFFFF",
  subtext: "#AAA",
  card: "#2A2A2A",
  primary: "#7C9BFF",
  danger: "#E57373",
  shadow: "#000000",
  border: "#333333",
};

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  colors: typeof lightTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
