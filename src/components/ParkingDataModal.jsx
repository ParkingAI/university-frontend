import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Progress,
  Divider,
} from "@heroui/react";

const StatCard = ({ label, value, color }) => (
  <div className={`flex flex-col items-center justify-center rounded-xl border px-4 py-3 ${color}`}>
    <span className="text-2xl font-bold">{value}</span>
    <span className="text-[11px] font-medium mt-0.5">{label}</span>
  </div>
);

const ParkingDataModal = ({ isOpen, data, onClose }) => {
  if (!data) return null;

  const total = data.Capacity || 0;
  const occupied = data.occupied || 0;
  const free = data.free ?? (total - occupied);
  const isFull = free <= 0;
  const percentage = total > 0 ? Math.round((occupied / total) * 100) : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 pb-2">
          <h3 className="text-xl font-bold text-gray-800">{data.name}</h3>
          <p className="text-sm text-gray-500 font-normal">{data.address}</p>
        </ModalHeader>

        <Divider />

        <ModalBody className="py-5">
       
          <div className="flex gap-2 flex-wrap">
            {data.zone && (
              <Chip variant="flat" color="primary" size="sm">
                {data.zone}
              </Chip>
            )}
            {data.type && (
              <Chip variant="flat" color="secondary" size="sm">
                {data.type}
              </Chip>
            )}
            <Chip
              variant="flat"
              color={isFull ? "danger" : "success"}
              size="sm"
            >
              {isFull ? "Popunjeno" : "Dostupno"}
            </Chip>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3">
            <StatCard
              label="Slobodno"
              value={free}
              color="border-emerald-200 bg-emerald-50 text-emerald-700"
            />
            <StatCard
              label="Zauzeto"
              value={occupied}
              color="border-red-200 bg-red-50 text-red-600"
            />
            <StatCard
              label="Ukupno"
              value={total}
              color="border-blue-200 bg-blue-50 text-blue-600"
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-gray-600">Popunjenost</span>
              <span className={`text-xs font-bold ${isFull ? "text-red-600" : "text-emerald-600"}`}>
                {percentage}%
              </span>
            </div>
            <Progress
              size="md"
              value={percentage}
              maxValue={100}
              classNames={{
                indicator: isFull ? "bg-red-500" : "bg-emerald-500",
                track: "bg-gray-200",
              }}
            />
          </div>

          
          {(data.coordinates || data.parking_lots) && (
            <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Detalji</h4>
              <div className="flex flex-col gap-1.5 text-sm text-gray-600">
                {data.coordinates && (
                  <div className="flex justify-between">
                    <span>Koordinate</span>
                    <span className="font-mono text-xs text-gray-500">
                      {data.coordinates[1]?.toFixed(5)}, {data.coordinates[0]?.toFixed(5)}
                    </span>
                  </div>
                )}
                {data.parking_lots && (
                  <div className="flex justify-between">
                    <span>Parkirna mjesta</span>
                    <span className="font-medium">{data.parking_lots.length}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </ModalBody>

        <Divider />

        <ModalFooter>
          <Button color="primary" variant="flat" onPress={onClose}>
            Zatvori
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ParkingDataModal;
