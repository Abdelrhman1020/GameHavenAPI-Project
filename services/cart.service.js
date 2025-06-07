import { Game } from "./category.service.js"; // For Test
import Cart from "../models/Cart.model.js";

// Get Cart
export const getCart = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate("items.gameId", "price");

  if (!cart || !cart.items.length) return [];

  const itemsWithPrice = cart.items.map(item => ({
    gameId: item.gameId._id,
    quantity: item.quantity,
    price: item.gameId.price * item.quantity
  }));

  const totalPrice = cart.items.reduce((sum, item) => {
    const price = item.gameId.price || 0;
    return sum + (item.quantity * price);
  }, 0);

  return {
    cartItems: itemsWithPrice,
    totalPrice
  }
};

// Add to Cart
export const addToCart = async ({ userId, gameId, quantity = 1 }) => {
  const cart = await Cart.findOne({ userId }) || [];
  const game = await Game.findOne({ _id: gameId });

  if (!game) {
    const error = new Error("Game is Not Found!");
    error.status = 404;
    throw error;
  }
  
  if (cart.length === 0) {
    const newCart = await Cart.create({
      userId,
      items: [{ gameId, quantity }],
    });
    return newCart;
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.gameId.toString() === gameId.toString()
  );

  if (itemIndex > -1) {
    const quantityAvailable = cart.items[itemIndex].quantity + quantity > game.stock;
    if (quantityAvailable) {
      const error = new Error("Quantity is Not Available!");
      error.status = 400;
      throw error;
    }
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ gameId, quantity });
  }

  return await cart.save();
};

// Update Cart Item
export const updateCartItem = async ({ userId, gameId, quantity }) => {
  const cart = await Cart.findOne({ userId });
  const game = await Game.findOne({ _id: gameId });

  const itemIndex = cart.items.findIndex(
    (item) => item.gameId.toString() === gameId.toString()
  );

  if (itemIndex === -1) {
    throw new Error("Game not found in cart");
  }

  const quantityAvailable = quantity > game.stock;
  if (quantityAvailable) {
    const error = new Error("Quantity is Not Available!");
    error.status = 400;
    throw error;
  }
  cart.items[itemIndex].quantity = quantity;

  return await cart.save();
};

// Delete From Cart
export const deleteFromCart = async ({ userId, gameId }) => {
  const cart = await Cart.findOne({ userId });

  const itemIndex = cart.items.findIndex(
    (item) => item.gameId.toString() === gameId.toString()
  );

  if (itemIndex === -1) {
    const error = new Error("Game not found in cart");
    error.status = 404;
    throw error;
  }

  cart.items.splice(itemIndex, 1);

  return await cart.save();
};
