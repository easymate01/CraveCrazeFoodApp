const placeOrder = async (restaurantId, identityUserId, cartId) => {
  try {
    const payload = {
      restaurantId: restaurantId,
      identityUserId: identityUserId,
      cartId: cartId,
    };
    const response = await fetch(`${API_BASE_URL}/Orders/CreateOrder`, {
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
    console.log("Order placed...");
    return data;
  } catch (error) {
    throw new Error("Failed to place order");
  }
};

export default placeOrder;
