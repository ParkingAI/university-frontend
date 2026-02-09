import axios from "axios";

export const fetchCities = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/cities`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const fetchCity = async (id) => {
  console.log(id);
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/cities/${id}`,
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};
