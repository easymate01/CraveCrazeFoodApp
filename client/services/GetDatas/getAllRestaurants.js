import API_BASE_URL from "../../config";

const getAllRestaurants = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Restaurants`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching featured data:", error);
    throw error;
  }
};

export default getAllRestaurants;
