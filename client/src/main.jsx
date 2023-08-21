import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ModeContextProvider } from "./ModeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ModeContextProvider>
      <App />
    </ModeContextProvider>
  </Router>
);
