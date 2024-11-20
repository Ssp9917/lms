import Category from '../models/category.model.js';

// Get all categories
export const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log("Error in getAllCategory controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// getCategoryById
export const getCategoryById = async (req, res) => {

    const { id } = req.params

    try {
        const category = await Category.findById(id);
        res.status(200).json(category);
    } catch (error) {
        console.log("Error in getCategoryById controller", error.message)
        res.status(500).json({ message: "Internal server error" });
    }
}

// Add a new category
export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const categoryImage = req.file ? req.file.path : null;

        console.log(name, categoryImage)

        // Check if the category name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category name already exists" });
        }

        // Create and save the new category
        const category = new Category({ name, categoryImage });
        await category.save();

        res.status(201).json({ message: "Category added successfully", category });
    } catch (error) {
        console.log("Error in addCategory controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const editCategory = async (req, res) => {
    try {
        const { id } = req.params; // Get category ID from request parameters
        const updatedData = req.body;

        // If an image is uploaded, add its path to updatedData
        if (req.file) {
            updatedData.categoryImage = req.file.path; // Store the image path
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true, // Run schema validators on the updated data
        });

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', updatedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
};




// delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params; // Get category ID from request parameters
        const deletedCategory = await Category.findByIdAndDelete(id); // Delete the category

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};