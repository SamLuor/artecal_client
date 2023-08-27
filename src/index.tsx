import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";

import "./style/style.css";
import { AuthProvider } from "./hooks/Auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
