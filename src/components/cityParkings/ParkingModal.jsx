import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Button } from "@heroui/react";
import { Tooltip } from "@heroui/react";
import { Chip } from "@heroui/react";
import { EyeIcon } from "../../images/EyeIcon.jsx";
import { Switch } from "@heroui/react";
import CalendarIcon from "../../images/CalendarIcon.jsx";

const columns = [
  { key: "id", label: "BROJ PARKIRNOG MJESTA" },
  { key: "status", label: "STATUS" },
  { key: "actions", label: "AKCIJE" },
];

const statusChip = {
  true: "success",
  false: "danger",
};

const Actions = ({ data, onPress }) => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <Tooltip color="primary" content="Vizualizacija parkirnog mjesta">
          <Button
            variant="light"
            isIconOnly
            onPress={() =>
              onPress({
                isOpen: true,
                data: {
                  mode: "vizualization",
                  src:
                    data.status === true
                      ? data.statusImages.free
                      : data.statusImages.occupied,
                },
              })
            }
          >
            <EyeIcon className={"w-6 h-6"} />
          </Button>
        </Tooltip>
      </div>
      <div>
        <Tooltip color="primary" content="Rezervacija parkirnog mjesta">
          <Button
            variant="light"
            isIconOnly
            onPress={() =>
              onPress({
                isOpen: true,
                data: {
                  mode: "reservation",
                  id: data.id,
                },
              })
            }
          >
            <CalendarIcon className={"w-6 h-6"} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

const ParkingModal = ({ isOpen, data, onClose, onPress }) => {
  const renderCell = React.useCallback((parkingLot, columnKey) => {
    const cellValue =
      parkingLot[columnKey] !== undefined ? parkingLot[columnKey] : null;
    switch (columnKey) {
      case "id":
        return cellValue;
      case "status":
        return (
          <Chip variant="flat" color={statusChip[cellValue]}>
            {cellValue ? "Slobodno" : "Zauzeto"}
          </Chip>
        );
      case "actions":
        return <Actions data={parkingLot} onPress={onPress} />;
      default:
        return cellValue;
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose({ isOpen: false, data: null })}
      size="xl"
      isDismissable={false}
      isKeyboardDismissDisabled
    >
      <ModalContent>
        {data && (
          <>
            <ModalHeader className="flex flex-col gap-1.5">
              <h3 className="text-xl font-extrabold text-gray-600 tracking-tight">
                {data.name}
              </h3>
              <p className="text-lg font-extrabold text-gray-600 tracking-tight">
                Ukupno parkirnih mjesta {data.Capacity}
              </p>
              <p className="text-md text-gray-600 tracking-tight">
                Mogućnost detaljnog pregleda pojedinog parkirnog mjesta i
                rezervacije
              </p>
            </ModalHeader>
            <ModalBody>
              <Table
                aria-label="Table parking lots"
                radius="md"
                shadow="md"
                isStriped
                className="max-h-62.5"
                topContent={
                  <div className="w-full">
                    <Switch isSelected>Prikaži samo slobodne</Switch>
                  </div>
                }
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={data.parking_lots}>
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="flat">
                Zatvori
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ParkingModal;
