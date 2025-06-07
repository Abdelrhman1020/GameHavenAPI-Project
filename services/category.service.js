import mongoose from "mongoose"; // For Test
import Category from "../models/Category.model.js";
import Cart from "../models/Cart.model.js";

// Just for Test
export const Game = mongoose.model('Game', new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
}, { strict: false }));

// Get Categories
export const getCategories = async () => {
  return await Category.find({});
};

// Get Category Games
export const getCategoryGames = async (categoryId) => {
  const existingcategory = await Category.findOne({ _id: categoryId });

  if (!existingcategory) {
    const error = new Error("Category is not exists!");
    error.status = 404;
    throw error;
  }

  const games = await Game.find({ categoryId });
  return games;
};

// Add New Category
export const addNewCategory = async (name) => {
  const existingCategory = await Category.findOne({
    name: { $regex: new RegExp(`^${name}$`, 'i') }
  });

  if (existingCategory) {
    const error = new Error("Category already exists!");
    error.status = 403;
    throw error;
  }

  const newCategory = await Category.create({ name });
  return newCategory;
};

// Update Category
export const updateCategory = async ({ categoryId, name }) => {
  const existingCategory = await Category.findOne({
    name: { $regex: new RegExp(`^${name}$`, 'i') },
    _id: { $ne: categoryId }
  });

  if (existingCategory) {
    const error = new Error("Category already exists!");
    error.status = 403;
    throw error;
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    { name },
    { new: true }
  );

  if (!updatedCategory) {
    const error = new Error("Category not found!");
    error.status = 404;
    throw error;
  }

  return updatedCategory;
};

// Delete Category
export const deleteCategory = async (categoryId) => {
  const existingcategory = await Category.findOne({ _id: categoryId });

  if (!existingcategory) {
    const error = new Error("Category is not exists!");
    error.status = 404;
    throw error;
  }

  const games = await Game.find({ categoryId });
  const gameIdsToDelete = games.map(game => game._id);

  await Game.deleteMany({ _id: { $in: gameIdsToDelete } });

  await Cart.updateMany({}, {
      $pull: {
        items: {
          gameId: { $in: gameIdsToDelete }
        }
      }
    }
  );

  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  if (!deletedCategory) {
    const error = new Error("Category not found");
    error.status = 404;
    throw error;
  }

  return deletedCategory;
};