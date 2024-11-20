import apiSlice from './apiSlice';

export const categorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => 'category/getAllCategory',
        }),

        getCategoryById: builder.query({
            query: (id) => `category/getCategoryById/${id}`
        }),

        addCategory: builder.mutation({
            query: (category) => ({
                url: 'category/addCategory',
                method: 'POST',
                body: category,
            }),
        }),

        // Edit category mutation
        editCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `category/editCategory/${id}`,  // URL with category ID
                method: 'PUT',
                body: data,  // Send the name in the body as an object
            }),
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `category/deleteCategory/${id}`, // Make sure this URL is correct
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllCategoryQuery,
    useGetCategoryByIdQuery,
    useAddCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation,
} = categorySlice;
