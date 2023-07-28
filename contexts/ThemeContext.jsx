import { useState, useEffect, createContext } from "react"

const ThemeContext = createContext("light")

function getTheme() {
  //get the current theme from localStorage
  const theme = localStorage.getItem("theme")

  if (!theme) {
    //default theme is light
    localStorage.setItem("theme", "light")
    return "light"
  } else {
    return theme
  }
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  //get theme as soon as webapp loads
  useEffect(() => {
    const theme = getTheme()
    setTheme(theme)
  }, [])

  //when theme value is changed, set the changes to localStorage
  useEffect(() => {
    function refreshTheme() {
      localStorage.setItem("theme", theme)
    }

    refreshTheme()
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
