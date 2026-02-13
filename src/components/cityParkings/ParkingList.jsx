import React from "react";
import ParkingCard from "./ParkingCard.jsx";
import ParkingModal from "./ParkingModal.jsx";
import ActionsModal from "./ActionsModal.jsx";

const ParkingList = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [isActiosnModalOpen, setIsActionsModalOpen] = React.useState(false);
  const [actionsModalData, setActionsModalData] = React.useState(false);

  const handleOnPress = (e) => {
    const { isOpen, data } = e;
    setIsModalOpen(isOpen);
    setModalData(data);
  };

  const handleOnActionsPress = (e) => {
    const { isOpen, data } = e;
    setIsActionsModalOpen(isOpen);
    setActionsModalData(data);
  };

  const handleOnActionsClose = (e) => {
    const { isOpen, data } = e;
    setIsActionsModalOpen(isOpen);
    setActionsModalData(data);
  };

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map((item) => (
          <ParkingCard key={item.id} data={item} onPress={handleOnPress} />
        ))}
      </div>
      <ParkingModal
        isOpen={isModalOpen}
        data={modalData}
        onClose={handleOnPress}
        onPress={handleOnActionsPress}
      />
      <ActionsModal
        isOpen={isActiosnModalOpen}
        data={actionsModalData}
        onClose={handleOnActionsClose}
      />
    </div>
  );
};

export default ParkingList;
