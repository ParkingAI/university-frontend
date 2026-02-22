import React, { createContext, useContext, useRef, useCallback, useState } from "react";

const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const markerRefs = useRef({});
  const [searchQuery, setSearchQuery] = useState("");

  const registerMarker = useCallback((id, markerRef) => {
    markerRefs.current[id] = markerRef;
  }, []);

  const unregisterMarker = useCallback((id) => {
    delete markerRefs.current[id];
  }, []);

  const openPopup = useCallback((id) => {
    const marker = markerRefs.current[id];
    if (marker) {
      marker.openPopup();
    }
  }, []);

  return (
    <MapContext.Provider value={{ registerMarker, unregisterMarker, openPopup, searchQuery, setSearchQuery }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("useMap must be used within MapProvider");
  return ctx;
};
