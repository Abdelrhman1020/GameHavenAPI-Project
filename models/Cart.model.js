import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: { 
    type: [
      {
        gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
        quantity: { type: Number, required: true, min: 1 }
      }
    ],
    default: []
  },
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;