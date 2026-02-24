import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Divider,
} from "@heroui/react";
import useStreamSingleSSE from "../api/streamSingleSSE.js";

const CameraDataModal = ({ isOpen, data, onClose }) => {
  const { streamData: liveData } = useStreamSingleSSE(data?.id);
  const camera = liveData ? { ...data, ...liveData } : data;

  if (!camera) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 pb-2">
          <h3 className="text-xl font-bold text-gray-800">{camera.name}</h3>
          <p className="text-sm text-gray-500 font-normal">{camera.address}</p>
        </ModalHeader>

        <Divider />

        <ModalBody className="py-5">
          <div className="flex gap-2 flex-wrap">
            <Chip variant="flat" color="primary" size="sm">
              Kamera
            </Chip>
            {camera.status != null && (
              <Chip
                variant="flat"
                color={camera.status ? "success" : "danger"}
                size="sm"
              >
                {camera.status ? "Aktivna" : "Neaktivna"}
              </Chip>
            )}
          </div>

          <div className="mt-3 rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700">Posljednja detekcija</h4>
            </div>
            <div className="flex items-center justify-center bg-gray-100 h-[280px]">
              {camera.lastFrameUrl ? (
                <img
                  src={`${camera.lastFrameUrl}?t=${liveData?.updated_at ?? ""}`}
                  alt="Posljednja detekcija"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                  </svg>
                  <span className="text-sm">Slika nije dostupna</span>
                </div>
              )}
            </div>
          </div>

          {camera.coordinates && (
            <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Detalji</h4>
              <div className="flex flex-col gap-1.5 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Koordinate</span>
                  <span className="font-mono text-xs text-gray-500">
                    {camera.coordinates[1]?.toFixed(5)}, {camera.coordinates[0]?.toFixed(5)}
                  </span>
                </div>
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

export default CameraDataModal;
