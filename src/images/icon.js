import L from "leaflet";
import gicon from "./parking-pin.svg";
import cicon from "./camera-pin.svg";

export const pin = L.icon({
  iconUrl: gicon,
  iconSize: [35, 35],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const cameraPin = L.icon({
  iconUrl: cicon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -45],
});