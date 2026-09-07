/* Entry point — 05_Tech_Spec.md §4 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/onest/400.css";
import "@fontsource/onest/500.css";
import "@fontsource/onest/600.css";
import "@fontsource/onest/700.css";
import "@fontsource/onest/800.css";
import App from "./App";
import "./styles/globals.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
