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
import { CustomDatePicker } from "../ui/CustomDatePicker";
const ActionsModal = ({ isOpen, data, onClose }) => {
  const [reservationTime, setReservationTime] = React.useState({
    date: null,
    startTime: null,
    endTime: null,
  });

  const isTimeInvalid =
    reservationTime.startTime &&
    reservationTime.endTime &&
    reservationTime.startTime.compare(reservationTime.endTime) >= 0;

  const isActionDisabled =
    !reservationTime.date ||
    !reservationTime.startTime ||
    !reservationTime.endTime ||
    isTimeInvalid;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose({ modal: "actionsModal", isOpen: false, data: null });
        setReservationTime({
          date: null,
          startTime: null,
          endTime: null,
        });
      }}
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
                <>
                  <CustomDatePicker
                    label={"Vrijeme rezervacije"}
                    value={reservationTime}
                    onChange={setReservationTime}
                  />
                </>
              )}
            </ModalBody>
            <ModalFooter>
              {data.mode === "vizualization" ? (
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() =>
                    onClose({
                      modal: "actionsModal",
                      isOpen: false,
                      data: null,
                    })
                  }
                >
                  Zatvori
                </Button>
              ) : (
                <>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => {
                      onClose({
                        modal: "actionsModal",
                        isOpen: false,
                        data: null,
                      });
                      setReservationTime({
                        date: null,
                        startTime: null,
                        endTime: null,
                      });
                    }}
                  >
                    Zatvori
                  </Button>
                  <Button
                    color="primary"
                    variant="flat"
                    isDisabled={isActionDisabled}
                  >
                    Spremi
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ActionsModal;
