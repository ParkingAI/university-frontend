import React from "react";
import { useQuery } from "@tanstack/react-query";
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

  //mjesto za useSSE hook koji cu napraviti za real time updates sa servera na update o podatcima sa parkinga, treba samo invalidirati cache key "cityi-parkings", id od useQury invalidacija (promjena) ce uzrokovati rerendering i azurni podatci ce biti prosljedeni childovima

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
              {data.length}
            </span>
          )}
        </div>
      </div>
      <ParkingListFilters />
      <div className="w-full">
        {data && <ParkingList data={data} />} {isFetching && <Spinner />}
      </div>
    </div>
  );
};

export default CityParkings;
