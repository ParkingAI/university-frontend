import React from "react";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";
import { fetchCity } from "../api/cityApi";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner } from "@heroui/react";

const MapMarkerPopup = ({ map, activeCity }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["city", activeCity?.id], //srediti odmah da vraca sve potrebno, pa da tamo na drugom samo pogodi cache?
    queryFn: () => fetchCity(activeCity?.id),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const popupRef = React.useRef();
  const contentRef = React.useRef(document.createElement("div"));

  React.useEffect(() => {
    //stilizirati popup
    if (!map) return;

    popupRef.current = new mapboxgl.Popup({
      closeOnClick: false,
      offset: 25,
    });

    return () => popupRef.current.remove();
  }, []);

  React.useEffect(() => {
    if (!activeCity) return;

    popupRef.current
      .setLngLat(activeCity.coordinates)
      .setDOMContent(contentRef.current)
      .addTo(map);
  }, [activeCity]);

  return (
    <>
      {createPortal(
        isLoading ? (
          <Spinner />
        ) : (
          <div className="p-5 flex flex-col gap-2">
            <h4 className="font-bold text-xl text-gray-600 tracking-tight">
              Grad {data.name}
            </h4>
            <p className="text-lg text-gray-600 tracking-tight">
              Pokrivenih parkinga: {data.metadata.totalParkings}
            </p>
            <Button fullWidth color="primary">
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
