const placeOrder = async (cartItems) => {
  try {
    return true;
  } catch (error) {
    throw new Error("Failed to place order");
  }
};

export default placeOrder;
