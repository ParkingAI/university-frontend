import React from "react";
import ParkingCard from "./ParkingCard.jsx";
import ParkingModal from "./ParkingModal.jsx";
import ActionsModal from "./ActionsModal.jsx";

const ParkingList = ({ data }) => {
  const [modalsData, setModalsData] = React.useState({
    parkingModal: {
      isOpen: false,
      data: null,
    },
    actionsModal: {
      isOpen: false,
      data: null,
    },
  });

  const handleOnPress = (e) => {
    const { modal, isOpen, data } = e;
    setModalsData((prev) => ({
      ...prev,
      [modal]: {
        isOpen,
        data,
      },
    }));
  };

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map((item) => (
          <ParkingCard key={item.id} data={item} onPress={handleOnPress} />
        ))}
      </div>
      <ParkingModal
        isOpen={modalsData.parkingModal.isOpen}
        data={modalsData.parkingModal.data}
        onClose={handleOnPress}
        onPress={handleOnPress}
      />
      <ActionsModal
        isOpen={modalsData.actionsModal.isOpen}
        data={modalsData.actionsModal.data}
        onClose={handleOnPress}
      />
    </div>
  );
};

export default ParkingList;
