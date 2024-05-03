import API_BASE_URL from "../../config";

const addItemToCart = async ({ userId, dishId, quantity }) => {
  try {
    const payload = {
      dishId: dishId,
      quantity: quantity,
    };

    const response = await fetch(`${API_BASE_URL}/Cart/${userId}/add-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

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

export default addItemToCart;
