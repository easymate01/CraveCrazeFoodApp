import { useDispatch, useSelector } from "react-redux";
import API_BASE_URL from "../../config";
import authSlice, { selectUser } from "../../slices/authSlice";

const addItemToCart = async (id, dishId, quantity) => {
  try {
    const payload = {
      dishId: dishId,
      quantity: quantity,
    };
    const response = await fetch(`${API_BASE_URL}/Cart/${id}/add-item`, {
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
    console.error("Error while adding data to cart:", error);
    throw error;
  }
};

export default addItemToCart;
