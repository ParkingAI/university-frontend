import React from "react";

const GeneralReport = ({ freeSpaces = 0, occupiedSpaces = 0, totalSpaces = 0 }) => {

  const cards = [
    {
      label: "Slobodna mjesta",
      value: freeSpaces,
      bg: "bg-green-50",
    },
    {
      label: "Zauzeta mjesta",
      value: occupiedSpaces,
      bg: "bg-red-50",
    },
    {
      label: "Ukupno mjesta",
      value: totalSpaces,
      bg: "bg-white",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-600">Dobrodošli</h2>
      <div className="grid grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.bg} rounded-xl shadow-md px-5 py-4 flex flex-col gap-1`}
        >
          <span className="text-sm font-medium text-gray-500">
            {card.label}
          </span>
          <span className="text-2xl font-bold text-gray-600">
            {card.value}
          </span>
        </div>
      ))}
      </div>
    </div>
  );
};

export default GeneralReport;
