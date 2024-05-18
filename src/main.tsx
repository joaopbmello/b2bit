import React from "react";
import ReactDOM from "react-dom/client";
import SignIn from "./components/SignIn";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SignIn />
  </React.StrictMode>
);
