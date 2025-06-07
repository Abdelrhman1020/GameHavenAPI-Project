import { addNewCategory, deleteCategory, getCategories, getCategoryGames, updateCategory } from "../services/category.service.js";

// Get Cart Items Controller
export const getCategoriesController = async (req, res) => {
  try {
    const categories = await getCategories();

    res.status(200).json({ data: categories });
  } catch (error) {
    console.error("Error while fetching Categories:", error);

    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
      message
    });
  }
};

// Get Category Games
export const getCategoryGamesController = async (req, res) => {
  const { categoryId } = req.params;
  
  try {
    const games = await getCategoryGames(categoryId);

    res.status(200).json({ data: games });
  } catch (error) {
    console.error("Error while fetching Games From Category:", error);

    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
      message
    });
  }
};

// Add New Category
export const addNewCategoryController = async (req, res) => {
  const { name } = req.body;
  try {

    const newCategory = await addNewCategory(name);

    res.status(200).json({
      data: newCategory,
      message: "Category Added Successfully!"
    });
  } catch (error) {
    console.error("Error while Adding New Category:", error.message);

    const statusCode = error.status;
    const message = error.message;

    res.status(statusCode).json({
      message
    });
  }
};

// Update Category Controller
export const updateCategoryController = async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await updateCategory({ categoryId, name });

    res.status(201).json({
      data: updatedCategory,
      message: "Category Updated Successfully!"
    });
  } catch (error) {
    console.error("Error while Update Category:", error.message);

    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
      message
    });
  }
};

// Delete Category Controller
export const deleteCategoryController = async (req, res) => {
  const { categoryId } = req.params;

  try {
    await deleteCategory(categoryId);

    res.status(200).json({
      message: "Category Deleted Successfully!"
    });
  } catch (error) {
    console.error("Error while Detele Category:", error.message);

    const statusCode = error.status || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
      message
    });
  }
};