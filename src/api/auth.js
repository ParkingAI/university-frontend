import axios from "axios"

// User login
export const userLogin = async (formData) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/login`,
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response;
    } catch (error) {
      console.log(error)
        return error;
    }
};


//Check if user is logged in
export const checkUser = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/checkuser`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Error checking user");
  }
};