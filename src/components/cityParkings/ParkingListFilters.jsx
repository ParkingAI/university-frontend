import React from "react";
import { Input } from "@heroui/react";
import { Select, SelectSection, SelectItem } from "@heroui/react";
import { SearchIcon } from "../../images/SearchIcon.jsx";

const ParkingListFilters = () => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-3.5 items-center md:min-h-9 md:max-h-9">
      <Input
        radius="sm"
        variant="bordered"
        classNames={{
          inputWrapper: "border-1 min-h-9 max-h-9 w-full md:max-w-[300px]",
          base: "w-full md:max-w-[300px]",
        }}
        placeholder="Tražite prema adresi"
        startContent={<SearchIcon />}
      />
      <Select
        radius="sm"
        classNames={{
          trigger: "min-h-9 max-h-9 w-full md:w-[140px]",
          base: "min-h-9 max-h-9 w-full md:w-[140px]",
        }}
        isClearable
        placeholder="Dostupnost"
      />
      <Select
        radius="sm"
        classNames={{
          trigger: "min-h-9 max-h-9 w-full md:w-[110px]",
          base: "min-h-9 max-h-9 w-full md:w-[110px]",
        }}
        isClearable
        placeholder="Zona"
      />
      <Select
        radius="sm"
        classNames={{
          trigger: "min-h-9 max-h-9 w-full md:w-[110px]",
          base: "min-h-9 max-h-9 w-full md:w-[110px]",
        }}
        isClearable
        placeholder="Tip"
      />
    </div>
  );
};

export default ParkingListFilters;
