import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/Api" }),
  reducerPath: "adminApi",
  tagTypes: ["Entreprise", "Pack", "Subscription", "Service", "Message","Products", "Clients", "Sales", "Dashboard", "Invoices",],
  endpoints: (build) => ({
    // Entreprise
    getEntreprise: build.query({
      query: (id) => `Entreprise/${id}`,
      providesTags: ["Entreprise"],
    }),
    getAllEntreprises: build.query({
      query: () => `Entreprise`,
      providesTags: ["Entreprise"],
    }),
    getOneEntreprise: build.query({
      query: (id) => `Entreprise/${id}`,
      providesTags: ["Entreprise"],
    }),
    getEntrepriseDetail: build.query({
      query: (id) => `Entreprise/entreprisedetail/${id}`,
      providesTags: ["Entreprise"],
    }),
    getDashboard: build.query({
      query: () => `Entreprise/dashboard`,
      providesTags: ["Entreprise"],
    }),
    getEntrepriseState: build.query({
      query: () => `Entreprise/EnterpriseStat`,
      providesTags: ["Entreprise"],
    }),
    removeEntreprise: build.mutation({
      query: (id) => ({
        url: `Entreprise/remove/${id}`,
        method: "DELETE",
      }),
    }),
    loginEntreprise: build.mutation({
      query: (loginData) => ({
        url: `Entreprise/login/`,
        method: "POST",
        body: loginData,
      }),
    }),
    registerEntreprise: build.mutation({
      query: (data) => ({
        url: `Entreprise/register/`,
        method: "POST",
        body: data,
      }),
    }),

    // Service
    getAllServices: build.query({
      query: () => `Service`,
      providesTags: ["Service"],
    }),
    addService: build.mutation({
      query: (serviceData) => ({
        url: `Service/add/`,
        method: "POST",
        body: serviceData,
      }),
    }),
    getOneService: build.query({
      query: (id) => `Service/${id}`,
      providesTags: ["Service"],
    }),
    updateService: build.mutation({
      query: ({ id, ServiceData }) => ({
        url: `Service/edit/${id}`,
        method: "PUT",
        body: ServiceData,
      }),
    }),
    removeService: build.mutation({
      query: (id) => ({
        url: `Service/remove/${id}`,
        method: "DELETE",
      }),
    }),

    // Pack
    getPacks: build.query({
      query: () => "Pack",
      providesTags: ["Pack"],
    }),
    addPack: build.mutation({
      query: (PackData) => ({
        url: `Pack/add`,
        method: "POST",
        body: PackData,
      }),
    }),
    getOnePack: build.query({
      query: (id) => `Pack/${id}`,
      providesTags: ["Pack"],
    }),
    updatePack: build.mutation({
      query: ({ id, pack }) => ({
        url: `Pack/edit/${id}`,
        method: "PUT",
        body: pack, 
      })
    }),
    removePack: build.mutation({
      query: (id) => ({
        url: `Pack/remove/${id}`,
        method: "DELETE",
      }),
    }),

    // Subscription
    getSubscriptions: build.query({
      query: () => `Subscription`,
      providesTags: ["Subscription"],
    }),
    addSubscription: build.mutation({
      query: (SubscriptionData) => ({
        url: `Subscription/add`,
        method: "POST",
        body: SubscriptionData,
      }),
    }),
    getOneSubscription: build.query({
      query: (id) => `Subscription/${id}`,
      providesTags: ["Subscription"],
    }),
    updateSubscription: build.mutation({
      query: ({ id, SubscriptionData }) => ({
        url: `Subscription/edit/${id}`,
        method: "PUT",
        body: SubscriptionData,
      }),
    }),
    removeSubscription: build.mutation({
      query: (id) => ({
        url: `Subscription/remove/${id}`,
        method: "DELETE",
      }),
    }),

    // Message
    getMessages: build.query({
      query: () => `Message`,
      providesTags: ["Message"],
    }),
    removeMessage: build.mutation({
      query: (id) => ({
        url: `Message/remove/${id}`,
        method: "DELETE",
      }),
    }),

    // Entreprise phase 

    getUser: build.query({
      query: (id) => `Entreprise/${id}`,
      providesTags: ["Entreprise"],
    }),
    getInvoices: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "Invoice",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Invoices"],
    }),
    getProducts: build.query({
      query: (id) => `Produit/Entreprise/${id}`,
      providesTags: ["Products"],
    }),
    getClients: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "Client",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Clients"],
    }),
    getSales: build.query({
      query: () => "Invoice/summary",
      providesTags: ["Sales"],
    }),
    getDashboardClient: build.query({
      query: () => "Invoice/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetEntrepriseQuery,
  useGetAllEntreprisesQuery,
  useGetOneEntrepriseQuery,
  useGetEntrepriseStateQuery,
  useGetEntrepriseDetailQuery,
  useGetDashboardQuery,
  useRemoveEntrepriseMutation,
  useLoginEntrepriseMutation,
  useRegisterEntrepriseMutation,
  useGetPacksQuery,
  useGetOnePackQuery,
  useAddPackMutation,
  useUpdatePackMutation,
  useRemovePackMutation,

  useGetAllServicesQuery,
  useGetOneServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useRemoveServiceMutation,

  useGetSubscriptionsQuery,
  useAddSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useRemoveSubscriptionMutation,

  useGetMessagesQuery,
  useRemoveMessageMutation,

  // Entreprise fnc

  useGetUserQuery,
  useGetInvoicesQuery,
  useGetProductsQuery,
  useGetClientsQuery,
  useGetSalesQuery,
  useGetDashboardClientQuery,
} = api;
