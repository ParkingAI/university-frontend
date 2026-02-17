import React from 'react'
import DashboardMap from '../components/DashboardMap'
import Datagrid from '../components/Datagrid.jsx'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllParkings } from "../api/parkingApi.js"
import { getStreams } from "../api/streamApi.js"
import { useUserAuthorization } from '../hooks/UserAuthorization.jsx'
import { Tooltip } from "@heroui/react";
import { EyeIcon, EditIcon, DeleteIcon } from "../images/datagridIcons.jsx"

const CamerasDashboard = () => {
  const queryClient = useQueryClient();

  const { user } = useUserAuthorization()

  const { data: parkingData = [], isLoading, error } = useQuery({
    queryKey: ["parkings", user?.cityId],
    queryFn: () => getAllParkings(user?.cityId),
    staleTime: 1000 * 60 * 60,
    enabled: !!user?.cityId
  });

  const { data: streamData = [] } = useQuery({
    queryKey: ["streams", user?.cityId],
    queryFn: () => getStreams(user?.cityId),
    staleTime: 1000 * 60 * 60,
    enabled: !!user?.cityId
  });

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
          { name: "ADRESA", uid: "address" },
          { name: "AKCIJE", uid: "actions" },
        ]}
        title="Kamere"
        renderCell={(item, columnKey) => {
          if (columnKey === "actions") {
            return (
              <div className="relative flex items-center justify-center gap-2">
                <Tooltip content="Detalji">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </span>
                </Tooltip>
                <Tooltip content="Uredi">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Obriši">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            );
          }
          return item[columnKey];
        }}
      />
    </div>
  )
}

export default CamerasDashboard
