import { React } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import App from "./App.jsx";
import { CookiesProvider } from "react-cookie";
import "mapbox-gl/dist/mapbox-gl.css";

createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </CookiesProvider>,
);
