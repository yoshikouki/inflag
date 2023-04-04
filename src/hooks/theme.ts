import { createContext, useContext } from "react";

export interface ThemeContextType {
  theme: "light" | "dark";
  changeTheme: (theme: this["theme"]) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  changeTheme: (theme) => theme,
  toggleTheme: () => undefined,
});

const useTheme = () => useContext(ThemeContext);
export default useTheme;
