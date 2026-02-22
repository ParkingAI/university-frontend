import React, { useState } from 'react'
import DashboardMap from '../components/DashboardMap'
import Datagrid from '../components/Datagrid.jsx'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllParkings } from "../api/parkingApi.js"
import { getStreams, controlStream } from "../api/streamApi.js"
import { useUserAuthorization } from '../hooks/UserAuthorization.jsx'
import { Tooltip, Chip } from "@heroui/react";
import { PlayIcon, StopIcon, RestartIcon, EyeIcon } from "../images/datagridIcons.jsx"
import CameraDataModal from '../components/CameraDataModal.jsx'

const CamerasDashboard = () => {
  const queryClient = useQueryClient();
  const [selectedCamera, setSelectedCamera] = useState(null);

  const { user } = useUserAuthorization()

  const { data: streamData = [] } = useQuery({
    queryKey: ["streams", user?.cityId],
    queryFn: () => getStreams(user?.cityId),
    staleTime: 1000 * 60 * 60,
    enabled: !!user?.cityId
  });

  const STATUS_AFTER_ACTION = {
    start:   "ACTIVE",
    stop:    "PAUSED",
    restart: "ACTIVE",
  };

  const sendControl = (streamId, action) => {
    controlStream(streamId, action);
    queryClient.setQueryData(["streams", user?.cityId], (old) =>
      old.map((stream) =>
        stream.id === streamId
          ? { ...stream, status: STATUS_AFTER_ACTION[action] }
          : stream
      )
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <DashboardMap
        data={streamData}
        dataType='cameras'
      />

      <Datagrid
        data={streamData}
        columns={[
          { name: "IME", uid: "name" },
          { name: "KOORDINATE", uid: "coordinates" },
          { name: "STATUS", uid: "status" },
          { name: "AKCIJE", uid: "actions" },
        ]}
        title="Kamere"
        renderCell={(item, columnKey) => {
          if (columnKey === "status") {
            const statusMap = {
              ACTIVE:   { color: "success", label: "Aktivna" },
              INACTIVE: { color: "default", label: "Neaktivna" },
              PAUSED:   { color: "warning", label: "Pauzirana" },
              ERROR:    { color: "danger",  label: "Greška" },
            };
            const { color, label } = statusMap[item.status] ?? { color: "default", label: item.status ?? "—" };
            return (
              <Chip size="sm" variant="flat" color={color}>
                {label}
              </Chip>
            );
          }
          if (columnKey === "coordinates") {
            if (!item.coordinates) return "—";
            return (
              <span className="font-mono text-xs text-default-500">
                {item.coordinates[1]?.toFixed(5)}, {item.coordinates[0]?.toFixed(5)}
              </span>
            );
          }
          if (columnKey === "actions") {
            return (
              <div className="relative flex items-center justify-center gap-2">
                <Tooltip content="Detalji">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() => setSelectedCamera(item)}
                  >
                    <EyeIcon />
                  </span>
                </Tooltip>
                <Tooltip color="success" content="Pokreni stream">
                  <span
                    className="text-lg text-success cursor-pointer active:opacity-50"
                    onClick={() => sendControl(item.id, "start")}
                  >
                    <PlayIcon />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Zaustavi stream">
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={() => sendControl(item.id, "stop")}
                  >
                    <StopIcon />
                  </span>
                </Tooltip>
                <Tooltip content="Restartuj stream">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() => sendControl(item.id, "restart")}
                  >
                    <RestartIcon />
                  </span>
                </Tooltip>
              </div>
            );
          }
          return item[columnKey] ?? "—";
        }}
      />

      <CameraDataModal
        isOpen={!!selectedCamera}
        data={selectedCamera}
        onClose={() => setSelectedCamera(null)}
      />
    </div>
  )
}

export default CamerasDashboard
