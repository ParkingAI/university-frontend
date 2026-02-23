import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllParkings } from "../../api/parkingApi.js";
import { useParams } from "react-router";
import { capitalizeRouteParam } from "../../../helpers/cityParkings.js";
import ParkingListFilters from "./ParkingListFilters.jsx";
import ParkingList from "./ParkingList.jsx";
import { Spinner } from "@heroui/react";

const CityParkings = () => {
  const params = useParams();
  const { city, id } = params;
  const { data, isFetching } = useQuery({
    queryKey: ["city-parkings", id],
    queryFn: () => getAllParkings(id),
    staleTime: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();
  const [filters, setFilters] = React.useState({
    search: null,
    availability: null,
    zone: null,
    type: null,
  });

  React.useEffect(() => {
    if (!id) return;
    const es = new EventSource(
      `${import.meta.env.VITE_API_URL}/parking-sse/${id}`,
      {
        heartbeatTimeout: 60000,
      },
    );

    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      queryClient.setQueryData(["city-parkings", id], data);
    };

    return () => es.close();
  }, [id]);

  const filteredData = React.useMemo(() => {
    if (!data) return;
    let filteredResult = data;
    if (filters.search) {
      filteredResult = filteredResult.filter(
        (item) => item.address.toLowerCase() === filters.search,
      );
    }
    if (filters.availability) {
      if (filters.availability === "min3") {
        filteredResult = filteredResult.filter((item) => item.free >= 3);
      } else if (filters.availability === "min5") {
        filteredResult = filteredResult.filter((item) => item.free >= 5);
      } else {
        filteredResult = filteredResult.filter((item) => item.free > 0);
      }
    }
    if (filters.zone) {
      filteredResult = filteredResult.filter(
        (item) => item.zone.toLowerCase() === filters.zone,
      );
    }
    if (filters.type) {
      filteredResult = filteredResult.filter(
        (item) => item.type.toLowerCase() === filters.type,
      );
    }
    return filteredResult;
  }, [data, filters]);

  return (
    <div className="w-full flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-gray-600 tracking-tight">
          Parkirališta grad {capitalizeRouteParam(city)}
        </h1>
        <div className="flex gap-1.5">
          <p className="text-md font-bold text-gray-600">Ukupno parkirališta</p>
          {isFetching ? (
            <span>
              <Spinner />
            </span>
          ) : (
            <span className="text-md font-bold text-gray-600">
              {filteredData.length}
            </span>
          )}
        </div>
      </div>
      <ParkingListFilters filters={filters} onFiltersChange={setFilters} />
      <div className="w-full">
        {filteredData && <ParkingList data={filteredData} />}{" "}
        {isFetching && <Spinner />}
      </div>
    </div>
  );
};

export default CityParkings;
