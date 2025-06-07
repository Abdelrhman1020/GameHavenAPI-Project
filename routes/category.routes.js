import { Router } from "express";
import { 
  addNewCategoryController,
  deleteCategoryController,
  getCategoriesController, 
  getCategoryGamesController,
  updateCategoryController} from "../controllers/category.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRole } from "../middleware/role.middleware.js";
import { categoryValidator, validate } from "../middleware/validation.middleware.js";

export const categoryRouter = Router();

categoryRouter.get("/", getCategoriesController);
categoryRouter.get("/:categoryId", getCategoryGamesController);
categoryRouter.post("/", [ categoryValidator, authenticate, authorizeRole(["admin"]), validate ], addNewCategoryController);
categoryRouter.put("/:categoryId", [ categoryValidator, authenticate, authorizeRole(["admin"]), validate ], updateCategoryController);
categoryRouter.delete("/:categoryId", [ authenticate, authorizeRole(["admin"]) ], deleteCategoryController);