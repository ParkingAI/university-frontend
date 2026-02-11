import React from "react";
import ParkingCard from "./ParkingCard.jsx";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

const ParkingList = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const handleOnPress = (e) => {
    const { isOpen, data } = e;
    setIsModalOpen(isOpen);
    setModalData(data);
  };

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map((item) => (
          <ParkingCard key={item.id} data={item} onPress={handleOnPress} />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => handleOnPress({ isOpen: false, data: null })}
      >
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ParkingList;
