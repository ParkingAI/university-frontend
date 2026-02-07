import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Chip, Spinner } from "@heroui/react";

const DashboardMap = ({ 
  data = [], 
  dataType= "parkings",
}) => {
  

  
  return (
    <div>
      <h3 className="text-xl font-semibold" >
        Mapa {dataType === 'cameras' ? 'Kamera' : dataType === 'parkings' ? 'Parkinga' : ''}
      </h3>
      <div className={`flex flex-col w-[95%] border border-gray-200 rounded-lg shadow p-3 mx-auto`}>
          <MapContainer
            className="mx-auto z-0 rounded-md w-full min-h-[55vh] h-full"
            center={[45.32425078861556, 13.576257]}
            zoom={12}
          >
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}" />
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />
          </MapContainer>
      </div>
    </div>
  );
};

export default DashboardMap;