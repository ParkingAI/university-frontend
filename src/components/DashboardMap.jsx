import React, { useCallback, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { pin, cameraPin } from "../images/icon.js"
import { useMap } from "../hooks/MapContext.jsx";

const defaultRenderPopup = (item) => (
  <div className="min-w-[180px]">
    <h4 className="text-sm font-semibold text-gray-800 m-0">{item.name}</h4>
    <p className="text-xs text-gray-500 mt-1 mb-0">{item.address}</p>
  </div>
);

const RegisteredMarker = ({ item, renderPopup, icon }) => {
  const { registerMarker, unregisterMarker } = useMap();

  const markerRef = useCallback((node) => {
    if (node) {
      registerMarker(item.id, node);
    } else {
      unregisterMarker(item.id);
    }
  }, [item.id, registerMarker, unregisterMarker]);

  return (
    <Marker
      ref={markerRef}
      position={[item?.coordinates[1], item?.coordinates[0]]}
      icon={icon}
    >
      <Popup>
        {renderPopup(item)}
      </Popup>
    </Marker>
  );
};

const DashboardMap = ({
  data = [],
  dataType = "parkings",
  searchKeys = ["name", "address", "zone"],
  renderPopup = defaultRenderPopup,
}) => {
  const { searchQuery, selectedZone } = useMap();

  const markerIcon = dataType === 'cameras' ? cameraPin : pin;

  const filteredData = useMemo(() => {
    let result = data;
    if (selectedZone && selectedZone !== "all") result = result.filter((item) => item.zone === selectedZone);
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) => {
          const val = item[key];
          return val != null && String(val).toLowerCase().includes(lower);
        })
      );
    }
    return result;
  }, [data, searchQuery, selectedZone, searchKeys]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">
          Mapa {dataType === 'cameras' ? 'Kamera' : dataType === 'parkings' ? 'Parkinga' : ''}
        </h3>
      </div>
      <div className="p-3">
        <MapContainer
          className="z-0 rounded-lg w-full min-h-[40vh]"
          center={[45.32425078861556, 13.576257]}
          zoom={12}
        >
          {filteredData.map((item) => (
            <RegisteredMarker
              key={item.id}
              item={item}
              renderPopup={renderPopup}
              icon={markerIcon}
            />
          ))}

          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}" />
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />
        </MapContainer>
      </div>
    </div>
  );
};

export default DashboardMap;
