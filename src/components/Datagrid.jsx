import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import {EyeIcon, EditIcon, DeleteIcon} from "../images/datagridIcons.jsx"
import SearchInput from "./SearchInput.jsx";
import { useMap } from "../hooks/MapContext.jsx";

const defaultRenderCell = (item, columnKey) => {
  return item[columnKey];
};

const filterData = (data, query, searchKeys) => {
  if (!query) return data;
  const lower = query.toLowerCase();
  return data.filter((item) =>
    searchKeys.some((key) => {
      const val = item[key];
      return val != null && String(val).toLowerCase().includes(lower);
    })
  );
};

const Datagrid = ({
  data = [],
  columns = [],
  renderCell = defaultRenderCell,
  title = "",
  ariaLabel = "Data table",
  searchKeys = ["name", "address", "zone"],
}) => {
  
  const { searchQuery, setSearchQuery, selectedZone, setSelectedZone } = useMap();

  const filteredData = useMemo(() => {
    let result = selectedZone && selectedZone !== "all" ? data.filter((item) => item.zone === selectedZone) : data;
    return filterData(result, searchQuery, searchKeys);
  }, [data, searchQuery, selectedZone, searchKeys]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {title && (
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="px-4 pt-3 pb-1 flex items-center gap-3">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        {(searchQuery || selectedZone !== "all") && (
          <button
            onClick={() => { setSearchQuery(""); setSelectedZone("all"); }}
            className="text-xs text-blue-500 hover:text-blue-700 transition-colors whitespace-nowrap"
          >
            Obriši filtere
          </button>
        )}
      </div>
      <div className="p-3">
        <Table aria-label={ariaLabel} isStriped>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={filteredData} emptyContent="Nema podataka za prikaz.">
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Datagrid;
