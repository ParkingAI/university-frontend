import axios from "axios";

export const getStreams = async (cityID) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/stream/${cityID}`,
  );
  return res.data;
};
