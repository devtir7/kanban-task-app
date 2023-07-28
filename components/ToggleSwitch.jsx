import { useState, useContext } from "react"

import { ThemeContext } from "../contexts/ThemeContext.jsx"

import darkThemeIcon from "../assets/icon-dark-theme.svg"
import lightThemeIcon from "../assets/icon-light-theme.svg"

import "../src/css/ToggleSwitch.css"

export default function ToggleSwitch() {
  const [isChecked, setIsChecked] = useState(false)

  const { toggleTheme } = useContext(ThemeContext)

  const handleToggle = () => {
    setIsChecked(!isChecked)
    toggleTheme()
  }

  return (
    <div className="toggle-footer">
      <img src={lightThemeIcon} />
      <label className={`toggle-switch ${isChecked ? "checked" : ""}`}>
        <input
          type="checkbox"
          className="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className="slider" />
      </label>
      <img src={darkThemeIcon} />
    </div>
  )
}
