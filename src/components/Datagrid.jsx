import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import {EyeIcon, EditIcon, DeleteIcon} from "../images/datagridIcons.jsx"



const defaultRenderCell = (item, columnKey) => {
  return item[columnKey];
};

const Datagrid = ({
  data = [],
  columns = [],
  renderCell = defaultRenderCell,
  title = "",
  ariaLabel = "Data table",
  searchKeys = ["name", "address"],
}) => {
  

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {title && (
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <input
          type="text"
          placeholder="Pretraži..."
          className="w-75 text-sm px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-colors"
        />
    
      </div>
      <div className="p-3">
        <Table aria-label={ariaLabel}  isStriped>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={data} emptyContent="Nema podataka za prikaz.">
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
