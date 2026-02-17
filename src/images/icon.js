import L from "leaflet";
import gicon from "./parking-pin.svg";
export const pin = L.icon({
  iconUrl: gicon,
  iconSize: [35, 35],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});