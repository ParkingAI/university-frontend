import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@heroui/react";
import { SearchIcon } from "../../images/SearchIcon.jsx";

const adressAutocompleteItems = [
  {
    label: "Cesta Contessa 21, 52466, Novigrad",
    key: "cesta contessa 21, 52466, novigrad",
  },
  {
    label: "Ul. Sv. Antona 38, 52466, Novigrad",
    key: "ul. sv. antona 38, 52466, novigrad",
  },
  {
    label: "Mandrač, 52466, Novigrad",
    key: "mandrač, 52466, novigrad",
  },
  {
    label: "Porporela, 52466, Novigrad",
    key: "porporela, 52466, novigrad",
  },
];
const availabilitySelectItems = [
  {
    label: "Slobodno",
    key: "free",
  },
  {
    label: "Slobodno 3 ili više",
    key: "min3",
  },
  {
    label: "Slobodno 5 ili više",
    key: "min5",
  },
];
const zoneSelectItems = [
  {
    label: "Zona 0",
    key: "zona 0",
  },
  {
    label: "Zona 1",
    key: "zona 1",
  },
  {
    label: "Zona 2",
    key: "zona 2",
  },
  {
    label: "Zona 3",
    key: "zona 3",
  },
  {
    label: "Zona 4",
    key: "zona 4",
  },
];

const typeSelectItems = [
  {
    label: "Privatno",
    key: "privatno",
  },
  {
    label: "Ulično",
    key: "ulično",
  },
  {
    label: "Javno",
    key: "javno",
  },
];

const ParkingListFilters = ({ filters, onFiltersChange }) => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-3.5 items-center md:min-h-9">
      <Autocomplete
        radius="sm"
        variant="bordered"
        classNames={{
          inputWrapper: "min-h-9",
          base: "w-full flex-1",
        }}
        selectorButtonProps={{
          className: "hidden",
        }}
        listboxProps={{
          emptyContent: "Adresa nije pronađena",
        }}
        placeholder="Tražite prema adresi..."
        startContent={<SearchIcon />}
        menuTrigger="input"
        defaultItems={adressAutocompleteItems}
        selectedKey={filters.search}
        onSelectionChange={(e) =>
          onFiltersChange({
            ...filters,
            search: e,
          })
        }
      >
        {(item) => (
          <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <Select
        radius="sm"
        classNames={{
          trigger: "min-h-9 w-full md:w-[200px]",
          base: "min-h-9 w-full md:w-[200px]",
        }}
        popoverProps={{
          classNames: {
            content: "",
          },
        }}
        isClearable
        placeholder="Dostupnost"
        items={availabilitySelectItems}
        selectedKeys={[filters.availability]}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            availability: e.target.value,
          })
        }
      >
        {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
      </Select>
      <Select
        radius="sm"
        classNames={{
          trigger: "min-h-9 w-full md:w-[130px]",
          base: "min-h-9 w-full md:w-[130px]",
        }}
        isClearable
        placeholder="Zona"
        items={zoneSelectItems}
        selectedKeys={[filters.zone]}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            zone: e.target.value,
          })
        }
      >
        {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
      </Select>
      <Select
        radius="sm"
        classNames={{
          trigger: "min-h-9 w-full md:min-w-[130px]",
          base: "min-h-9 w-full md:w-[130px]",
        }}
        isClearable
        placeholder="Tip"
        items={typeSelectItems}
        selectedKeys={[filters.type]}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            type: e.target.value,
          })
        }
      >
        {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
      </Select>
    </div>
  );
};

export default ParkingListFilters;
