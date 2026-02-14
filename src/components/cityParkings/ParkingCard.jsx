import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Progress,
  Button,
} from "@heroui/react";
import { Divider } from "@heroui/react";
import mapboxgl from "mapbox-gl";

const ParkingCard = ({ data, onPress }) => {
  const mapRef = React.useRef();
  const mapContainerRef = React.useRef();
  const markerRef = React.useRef();
  const isFull = data.Capacity === data.occupied;
  React.useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [data.coordinates[0], data.coordinates[1]],
      zoom: 15,
    });

    markerRef.current = new mapboxgl.Marker()
      .setLngLat([data.coordinates[0], data.coordinates[1]])
      .addTo(mapRef.current);

    return () => mapRef.current.remove();
  }, []);
  return (
    <Card fullWidth>
      <CardHeader className="flex flex-col items-start gap-2">
        <p className="text-lg font-semibold text-gray-600 tracking-tight">
          {data.name}
        </p>
        <p className="text-md text-gray-600 tracking-tight">{data.address}</p>
        <p className="text-md text-gray-600 tracking-tight">{data.zone}</p>
        <p className="text-md text-gray-600 tracking-tight">
          Tip parkirališa: {data.type}
        </p>
      </CardHeader>
      <Divider />
      <CardBody>
        <div
          id="map-container"
          ref={mapContainerRef}
          className="w-full min-h-[30vh] rounded-lg overflow-hidden shadow-md"
        />
      </CardBody>
      <Divider />
      <CardFooter className="flex-col gap-2.5 items-start">
        <Progress
          className="w-full"
          size="sm"
          classNames={{
            indicator: isFull ? "bg-red-500" : "bg-green-500",
            label: "font-extrabold text-md text-gray-600 tracking-tight",
          }}
          label={`Dostupno ${data.free} od ${data.Capacity}`}
          maxValue={data.Capacity}
          value={isFull ? data.occupied : data.free}
        />
        <Button
          color="primary"
          radius="sm"
          size="md"
          fullWidth
          className="font-bold"
          onPress={() =>
            onPress({ modal: "parkingModal", isOpen: true, data: data })
          }
        >
          Detaljniji pregled
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ParkingCard;
