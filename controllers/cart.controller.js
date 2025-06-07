import { addToCart, deleteFromCart, getCart, updateCartItem } from "../services/cart.service.js";

// Get Cart Items Controller
export const getCartItemsController = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const cartItems = await getCart(userId);

    res.status(200).json({ data: cartItems.items ? cartItems.items : cartItems });
  } catch (error) {
    console.error("Error while fetching Cart:", error);

    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
      message
    });
  }
};

// Add To Cart Controller
export const addToCartController = async (req, res) => {
  const { id: userId } = req.user;
  const { gameId, quantity } = req.body;

  try {
    const newCartItem = await addToCart({ userId, gameId, quantity });

    res.status(200).json({
      data: newCartItem,
      message: "Game Added to Cart"
    });
  } catch (error) {
    console.error("Error while Adding to Cart:", error.message);

    const statusCode = error.status;
    const message = error.message;

    res.status(statusCode).json({
      message
    });
  }
};

// Update Cart Item Controller
export const updateCartItemController = async (req, res) => {
  const { id: userId } = req.user;
  const { gameId } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCartItem = await updateCartItem({ userId, gameId, quantity });

    res.status(201).json({
      data: updatedCartItem,
      message: "Game Updated in Cart"
    });
  } catch (error) {
    console.error("Error while Update game in Cart:", error.message);

    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
      message
    });
  }
};

// Delete From Cart Controller
export const deleteFromCartController = async (req, res) => {
  const { id: userId } = req.user;
  const { gameId } = req.params;

  try {
    await deleteFromCart({ userId, gameId });

    res.status(200).json({
      message: "Game Deleted from Cart"
    });
  } catch (error) {
    console.error("Error while Detele Game from Cart:", error.message);

    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
      message
    });
  }
};