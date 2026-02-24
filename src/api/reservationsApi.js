import axios from "axios";

export const createReservation = async (data) => {
  const { parkingLotId, date, startTime, endTime } = data;

  const reservationFrom = new Date(date.toDate("UTC"));
  reservationFrom.setUTCHours(startTime.hour, startTime.minute, 0, 0);
  const reservationUntil = new Date(date.toDate("UTC"));
  reservationUntil.setUTCHours(endTime.hour, endTime.minute, 0, 0);

  const body = {
    parkingLotId,
    reservationFrom: reservationFrom.toISOString(),
    reservationUntil: reservationUntil.toISOString(),
  };
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/reservation`,
      body,
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
