import React from "react";
import CityParkings from "../components/cityParkings/CityParkings";
import previousIcon from "../images/Previous.svg";
import { useNavigate } from "react-router-dom";

const CityParkingsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col items-start gap-2.5">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <img src={previousIcon} />
        <span className="text-blue-500 underline">
          Povratak na mapu gradova
        </span>
      </div>
      <CityParkings />
    </div>
  );
};

export default CityParkingsPage;
