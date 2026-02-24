import React from "react";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";
import { fetchCity } from "../api/cityApi";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner } from "@heroui/react";
import { useNavigate } from "react-router-dom";

const MapMarkerPopup = ({ map, activeCity, setActiveCity }) => {
  const { data, isFetching } = useQuery({
    queryKey: ["city", activeCity?.id],
    queryFn: () => fetchCity(activeCity?.id),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const popupRef = React.useRef();
  const contentRef = React.useRef(document.createElement("div"));
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!map) return;

    popupRef.current = new mapboxgl.Popup({
      closeOnClick: false,
      offset: 40,
    });

    popupRef.current.on("close", () => setActiveCity(null));

    return () => popupRef.current.remove();
  }, [map]);

  React.useEffect(() => {
    if (!activeCity) return;

    popupRef.current
      .setLngLat(activeCity.coordinates)
      .setDOMContent(contentRef.current)
      .addTo(map);
  }, [activeCity]);

  const handleNavigate = () => {
    navigate(`${data?.name.toLowerCase()}/${data?.id}/parkiralista`);
  };

  return (
    <>
      {createPortal(
        isFetching ? (
          <Spinner />
        ) : (
          <div className="p-3 flex flex-col gap-1.5">
            <h4 className="font-bold text-xl text-gray-600 tracking-tight">
              Grad {data.name}
            </h4>
            <p className="text-lg text-gray-600 tracking-tight">
              Pokrivenih parkinga: {data.totalParkings}
            </p>
            <Button
              onPress={handleNavigate}
              fullWidth
              color="primary"
              className="font-bold"
            >
              Pogledaj situaciju
            </Button>
          </div>
        ),
        contentRef.current,
      )}
    </>
  );
};

export default MapMarkerPopup;
