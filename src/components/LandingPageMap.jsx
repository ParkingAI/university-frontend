import React from "react";
import mapboxgl from "mapbox-gl";
import { useQuery } from "@tanstack/react-query";
import { fetchCities } from "../api/cityApi.js";
import { Spinner } from "@heroui/react";
import MapMarker from "./MapMarker.jsx";
import MapMarkerPopup from "./MapMarkerPopup.jsx";

const LandingPageMap = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: () => fetchCities(),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const mapRef = React.useRef();
  const mapContainerRef = React.useRef();
  const [activeCity, setActiveCity] = React.useState(null);

  React.useEffect(() => {
    //srediti nestajanje markera, tooglanje markera i popupa
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [14.5, 44.8],
      zoom: 7,
    });

    return () => mapRef.current.remove();
  }, []);

  const handleActiveCity = (city) => {
    setActiveCity(city);
  };

  return (
    <section
      id="gradovi"
      className="w-full px-3 flex flex-col gap-5 items-start"
    >
      <div>
        <h3 className="text-3xl font-extrabold text-gray-600 tracking-tight inline-block">
          Partnerski gradovi
        </h3>
        <span className="ml-3">{isLoading && <Spinner />}</span>
      </div>
      <div
        id="map-container"
        ref={mapContainerRef}
        className="w-full min-h-[40vh] rounded-2xl overflow-hidden shadow-lg"
      />
      {mapRef.current &&
        data &&
        data.map((item) => {
          return (
            <MapMarker
              key={item.id}
              map={mapRef.current}
              city={item}
              onClick={handleActiveCity}
            />
          );
        })}
      {mapRef.current && activeCity && (
        <MapMarkerPopup map={mapRef.current} activeCity={activeCity} />
      )}
    </section>
  );
};

export default LandingPageMap;
