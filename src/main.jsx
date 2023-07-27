import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

import { ModalProvider } from "../contexts/ModalContext.jsx"
import { TasksProvider } from "../contexts/TasksContext.jsx"
import { ThemeProvider } from "../contexts/ThemeContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>
)
