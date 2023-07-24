import React, { useState } from "react";
import "../src/ToggleSwitch.css";

export default function ToggleSwitch() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className={`toggle-switch ${isChecked ? "checked" : ""}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className="slider" />
    </label>
  );
}
