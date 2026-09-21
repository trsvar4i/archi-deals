import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import TelegramMiniApp from "./TelegramMiniApp";
import "./styles.css";
import "./theme.css";
import "./telegram-app.css";

const isTelegramOrderApp = new URLSearchParams(window.location.search).get("app") === "order";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isTelegramOrderApp ? <TelegramMiniApp /> : <App />}
  </React.StrictMode>,
);
