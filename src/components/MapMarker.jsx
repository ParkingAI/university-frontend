import React from "react";
import mapboxgl from "mapbox-gl";

const MapMarker = ({ map, city, onClick }) => {
  const { coordinates } = city;

  const markerRef = React.useRef();

  React.useEffect(() => {
    if (!map) return;
    const marker = (markerRef.current = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map));

    const el = marker.getElement();

    const handleClick = () => {
      onClick(city);
    };

    el.addEventListener("click", handleClick);

    return () => {
      markerRef.current.remove();
      el.removeEventListener("click", handleClick);
    };
  }, [map]);

  return null;
};

export default MapMarker;
