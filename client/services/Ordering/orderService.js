const placeOrder = async (cartItems) => {
  try {
    console.log("Order placed successfully:", cartItems);
    return true;
  } catch (error) {
    console.error("Error placing order:", error);
    throw new Error("Failed to place order");
  }
};

export default placeOrder;
