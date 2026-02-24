import React, { useMemo } from "react";
import { Select, SelectItem } from "@heroui/react";
import { useMap } from "../hooks/MapContext.jsx";

const GeneralReport = ({ parkingData = [] }) => {
  const { selectedZone, setSelectedZone } = useMap();

  const zones = useMemo(() => {
    const unique = [...new Set(parkingData.map((p) => p.zone).filter(Boolean))];
    unique.sort();
    return unique;
  }, [parkingData]);

  const filtered = useMemo(() => {
    if (selectedZone === "all") return parkingData;
    return parkingData.filter((p) => p.zone === selectedZone);
  }, [parkingData, selectedZone]);

  const totalSpaces = filtered.reduce((sum, p) => sum + (p.Capacity || 0), 0);
  const occupiedSpaces = filtered.reduce((sum, p) => sum + (p.occupied || 0), 0);
  const freeSpaces = totalSpaces - occupiedSpaces;

  const cards = [
    {
      label: "Slobodna mjesta",
      value: freeSpaces,
      bg: "bg-green-50",
    },
    {
      label: "Zauzeta mjesta",
      value: occupiedSpaces,
      bg: "bg-red-50",
    },
    {
      label: "Ukupno mjesta",
      value: totalSpaces,
      bg: "bg-white",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-600">Dobrodošli</h2>
        <Select
          placeholder="Sve zone"
          aria-label="Zona"
          selectedKeys={[selectedZone]}
          onChange={(e) => setSelectedZone(e.target.value)}
          className="max-w-[170px]"
          size="sm"
          variant="flat"
        >
          <SelectItem key="all">Sve zone</SelectItem>
          {zones.map((zone) => (
            <SelectItem key={zone}>{zone}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-3 gap-4 max-w-5xl">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.bg} rounded-lg shadow-sm px-4 py-6 flex flex-col gap-0.5 items-center text-center`}
        >
          <span className="text-sm font-medium text-gray-500">
            {card.label}
          </span>
          <span className="text-2xl font-bold text-gray-600">
            {card.value}
          </span>
        </div>
      ))}
      </div>
    </div>
  );
};

export default GeneralReport;
