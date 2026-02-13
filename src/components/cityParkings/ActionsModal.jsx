import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Image } from "@heroui/react";
const ActionsModal = ({ isOpen, data, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose({ isOpen: false, data: null })}
    >
      <ModalContent>
        {data && (
          <>
            <ModalHeader>
              <h3 className="text-xl font-extrabold text-gray-600 tracking-tight">
                {data.mode === "vizualization"
                  ? "Vizualizacija parkirnog mjesta"
                  : "Rezervacija parkirnog mjesta"}
              </h3>
            </ModalHeader>
            <ModalBody>
              {data.mode === "vizualization" ? (
                <Image isZoomed shadow="md" radius="md" src={data.src} />
              ) : (
                <></>
              )}
            </ModalBody>
            <ModalFooter>
              {data.mode === "vizualization" ? (
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => onClose({ isOpen: false, data: null })}
                >
                  Zatvori
                </Button>
              ) : (
                <></>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ActionsModal;
