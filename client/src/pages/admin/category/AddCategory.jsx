import { useAddCategoryMutation } from '@/api/categorySlice';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null); // State for the category image
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name); // Add name to FormData
      if (image) {
        formData.append("categoryImage", image); // Add categoryImage to FormData
      }

      // Call the mutation function to add the category
      await addCategory(formData).unwrap();

      // Show a success message with SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: 'Category added successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Reset the form fields
      setName('');
      setImage(null);
    } catch (error) {
      console.log(error);
      // Show an error message if something goes wrong
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add category.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter category name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryImage">
          Category Image
        </label>
        <input
          type="file"
          id="categoryImage"
          onChange={handleImageChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          accept="image/*"
          // required
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? 'Adding...' : 'Add Category'}
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
