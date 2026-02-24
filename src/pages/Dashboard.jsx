import React, { useState } from 'react'
import DashboardMap from '../components/DashboardMap'
import Datagrid from '../components/Datagrid.jsx'
import Sidebar from '../components/Sidebar.jsx'
import CamerasDashboard from "./CamerasDashboard.jsx"
import UserAccountSettings from "./UserAccountSettings.jsx"
import { Routes, Route } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getAllParkings } from "../api/parkingApi.js"
import { useUserAuthorization } from '../hooks/UserAuthorization.jsx'
import { Tooltip } from "@heroui/react";
import { EyeIcon, EditIcon, DeleteIcon, MapPinIcon } from '../images/datagridIcons.jsx';
import GeneralReport from '../components/GeneralReport.jsx'
import ParkingDataModal from '../components/ParkingDataModal.jsx'
import { MapProvider, useMap } from '../hooks/MapContext.jsx'
import useParkingSSE from '../api/parkingSSE.js'

const ParkingDashboard = ({ parkingData }) => {
  const { openPopup } = useMap();
  const [selectedParking, setSelectedParking] = useState(null);

  return (
    <>
      <div className="flex flex-col gap-6">
        <GeneralReport parkingData={parkingData} />
        <DashboardMap
          data={parkingData}
          dataType='parkings'
          renderPopup={(item) => (
            <div className="min-w-[200px]">
              <h4 className="text-sm font-semibold text-gray-800 m-0">{item.name}</h4>
              <p className="text-xs text-gray-500 mt-1 mb-2">{item.address}</p>
              {item.zone && (
                <span className="inline-block text-[11px] font-medium text-gray-600 bg-gray-100 rounded px-1.5 py-0.5 mb-2">
                  {item.zone}
                </span>
              )}
              <div className="flex gap-2 mt-1">
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 rounded px-1.5 py-0.5">
                  Slobodno: {item.free}
                </span>
                <span className="text-[11px] font-medium text-red-600 bg-red-50 rounded px-1.5 py-0.5">
                  Zauzeto: {item.occupied}
                </span>
                <span className="text-[11px] font-medium text-blue-600 bg-blue-50 rounded px-1.5 py-0.5">
                  Ukupno: {item.Capacity}
                </span>
              </div>
            </div>
          )}
        />

        <Datagrid
          data={parkingData}
          columns={[
            { name: "IME", uid: "name" },
            { name: "ADRESA", uid: "address" },
            { name: "ZONA", uid: "zone" },
            { name: "POPUNJENOST", uid: "occupancy" },
            { name: "AKCIJE", uid: "actions" },
          ]}
          title="Parkinzi"
          renderCell={(item, columnKey) => {
            if (columnKey === "occupancy") {
              const total = item.Capacity || 0;
              const occupied = item.occupied || 0;
              const free = item.free ?? (total - occupied);
              const isFull = free <= 0;
              const percentage = total > 0 ? Math.round((occupied / total) * 100) : 0;

              return (
                <div className="flex flex-col gap-1 w-[100px]">
                  <div className="flex items-center justify-between text-[11px] font-medium">
                    <span className={isFull ? "text-red-600" : "text-emerald-600"}>
                      {free}/{total}
                    </span>
                    <span className="text-gray-400">
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${isFull ? "bg-red-500" : "bg-emerald-500"}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            }
            if (columnKey === "actions") {
              return (
                <div className="relative flex items-center justify-center gap-2">
                  <Tooltip content="Detalji">
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      onClick={() => setSelectedParking(item)}
                    >
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Prikaži na mapi">
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      onClick={() => openPopup(item.id)}
                    >
                      <MapPinIcon />
                    </span>
                  </Tooltip>
               
                </div>
              );
            }
            return item[columnKey];
          }}
        />
      </div>

      <ParkingDataModal
        isOpen={!!selectedParking}
        data={selectedParking}
        onClose={() => setSelectedParking(null)}
      />
    </>
  );
};

const Dashboard = () => {

  const { user } = useUserAuthorization()

  const { data: parkingData = [] } = useQuery({
    queryKey: ["parkings", user?.cityId],
    queryFn: () => getAllParkings(user?.cityId),
    staleTime: 1000 * 60 * 60,
    enabled: !!user?.cityId
  });

  useParkingSSE(user?.cityId);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="ml-60 flex-1 p-6">
        <MapProvider>
          <Routes>
            <Route path='/parking' element={
              <ParkingDashboard parkingData={parkingData} />
            } />

            <Route path='/kamere' element={<CamerasDashboard />} />
            <Route path='/racun' element={<UserAccountSettings />} />
          </Routes>
        </MapProvider>
      </main>
    </div>
  )
}

export default Dashboard
