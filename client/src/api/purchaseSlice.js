import apiSlice from './apiSlice';

export const purchaseSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/purchase/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),

    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/purchase/create-checkout-session",
        method: "POST",
        body: { courseId },
      }),
    }),
  }),
});

export const {
  useGetCourseDetailWithStatusQuery,
  useCreateCheckoutSessionMutation
} = purchaseSlice;
