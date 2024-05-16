import API_BASE_URL from "../../config";

const emptyCartFromDb = async (cartId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Cart/${cartId}/empty`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log("The Cart is empty...");
    return true;
  } catch (error) {
    console.error("Error while emptying the cart:", error);
    throw error;
  }
};

export default emptyCartFromDb;
