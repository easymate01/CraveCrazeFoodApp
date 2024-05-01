import API_BASE_URL from "../../config";

const getFeatured = async () => {
  try {
    const response = await fetch(`http://172.20.10.2:7292/api/Featured`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching featured data:", error);
    throw error;
  }
};

export default getFeatured;
