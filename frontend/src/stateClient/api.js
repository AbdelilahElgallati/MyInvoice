import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/Api" }),
  reducerPath: "adminApi",
  tagTypes: ["Entreprise", "Invoices", "Products", "Clients", "Sales", "Dashboard"],
  endpoints: (build) => ({
    
  }),
}); // api crud aquivalent to axios

export const {
  useGetUserQuery,
  useGetInvoicesQuery,
  useGetProductsQuery,
  useGetClientsQuery,
  useGetSalesQuery,
  useGetDashboardQuery,
} = api;
