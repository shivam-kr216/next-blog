import React, { useState } from 'react'
import DarkTheme from './DarkTheme';

function loadDarkMode() {
  // it means on server it is always light theme
  if (typeof localStorage === 'undefined') {
    return false;
  }
  const value = localStorage.getItem("darkMode");
  // console.log(value);
  return value === null ? false : JSON.parse(value);
}

export default function ThemeSwitch() {
  const [darkMode, setDarkMode] = useState(loadDarkMode);
  const text = darkMode ? 'Light Mode' : 'Dark Mode';

  function handleClick() {
    // no need to check for below line because it will run on browser
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
    // console.log(darkMode);
  }

  return (
    <>
      <button onClick={handleClick} suppressHydrationWarning>
        {text}
      </button>
      <style jsx>{`
        button {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
        }
      `}</style>
      {darkMode && <DarkTheme />}
    </>
  )
}
