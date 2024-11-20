import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Load backend URL from environment variables
const BackendLiveUrl = import.meta.env.VITE_BACKEND_BASE_URL;

console.log(BackendLiveUrl);

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BackendLiveUrl}/`, // Base URL for API
    credentials: 'include', // Ensures cookies are sent with requests
  }),
  endpoints: (builder) => ({}), // Define API endpoints here
});

export default apiSlice;
