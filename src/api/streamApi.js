import axios from "axios";

export const getStreams = async (cityID) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/stream/${cityID}`,
  );
  
  return res.data;
};

const ACTION_MAP = {
  start: "create",
  stop: "pause",
  restart: "restart",
};

export const controlStream = async (streamId, action) => {
  const mappedAction = ACTION_MAP[action];
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/stream/${streamId}/controller?action=${mappedAction}`,
  );
  return res.data;
};
