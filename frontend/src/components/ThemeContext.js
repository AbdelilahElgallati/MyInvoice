import React, { createContext, useContext, useEffect, useState } from "react";

// Créer le contexte de thème
const ThemeContext = createContext();

// Créer un fournisseur de thème
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("currentMode"));

  useEffect(() => {
    const storedTheme = localStorage.getItem("currentMode");
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("currentMode", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Fonction utilitaire pour utiliser le contexte de thème dans un composant
export const useTheme = () => useContext(ThemeContext);
