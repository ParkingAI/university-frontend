import React from "react";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";

const MapMarker = ({ map, city, onClick }) => {
  const { coordinates } = city;

 const markerRef = React.useRef();
 const contentRef = React.useRef(document.createElement("div"));
 console.log(coordinates)
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

    return () => markerRef.current.remove();
  }, []);

  return (
    <>
      {createPortal(
        <div onClick={() => onClick(city)}></div>,
        contentRef.current,
      )}
    </>
  );
};

export default MapMarker;