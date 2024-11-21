import apiSlice from './apiSlice';

export const purchaseSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseDetailWithStatus: builder.query({
            query: (courseId) => ({
              url: `/purchase/${courseId}/detail-with-status`,
              method: "GET",
            }),
          }),
    }),
});

export const {
  useGetCourseDetailWithStatusQuery
} = purchaseSlice;
