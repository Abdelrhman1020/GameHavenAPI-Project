import { Router } from "express";
import { 
  addToCartController, 
  deleteFromCartController, 
  getCartItemsController, 
  updateCartItemController} from "../controllers/cart.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRole } from "../middleware/role.middleware.js";
import { addToCartValidator, updateCartItemValidator, validate } from "../middleware/validation.middleware.js";

export const cartRouter = Router();

cartRouter.get("/", [ authenticate, authorizeRole(["user"]) ], getCartItemsController);
cartRouter.post("/", 
  [ addToCartValidator, authenticate, authorizeRole(["user"]), validate ], addToCartController);
cartRouter.put("/:gameId", [ updateCartItemValidator, authenticate, authorizeRole(["user"]), validate ], updateCartItemController);
cartRouter.delete("/:gameId", [ authenticate, authorizeRole(["user"]) ], deleteFromCartController);