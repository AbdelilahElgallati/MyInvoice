import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/Api" }),
  reducerPath: "adminApi",
  tagTypes: ["Entreprise", "Pack", "Subscription", "Service", "Message","Products", "Clients", "Sales", "Dashboard", "Invoices", "Categorie", "Model","Auth"],
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
    getEntrepriseByGoogleId: build.query({
      query: (id) => `Entreprise/EntrepriseGoogle/${id}`,
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
    updateEntreprise: build.mutation({
      query: ({ id, formData }) => ({
        url: `Entreprise/edit/${id}`,
        method: "PUT",
        body: formData,
      }),
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
    ForgoutPassword: build.mutation({
      query: (data) => ({
        url: `Entreprise/ForgoutPass/`,
        method: "POST",
        body: data,
      }),
    }),
    ResetPass: build.mutation({
      query: (data,id,token) => ({
        url: `Entreprise/reset-password/${id}/${token}`,
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
    getThreePacks: build.query({
      query: () => "Pack/ThreePacks",
      providesTags: ["Pack"],
      method: "GET"
    }),
    getAllPacksThreeService: build.query({
      query: () => "Pack/AllPacksThreeService",
      providesTags: ["Pack"],
      method: "GET"
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
    getSubscriptionEnt: build.query({
      query: (id) => `Subscription/Entreprise/${id}`,
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
    addMessage: build.mutation({
      query: (messageData) => ({
        url: `Message/add/`,
        method: "POST",
        body: messageData,
      }),
    }),
    getAllMessages: build.query({
      query: (id) => `Message`,
      providesTags: ["Message"],
    }),
    removeMessage: build.mutation({
      query: (id) => ({
        url: `Message/remove/${id}`,
        method: "DELETE",
      }),
    }),

    // Model
    getAllModels: build.query({
      query: () => `Model`,
      providesTags: ["Model"],
    }),
    addModel: build.mutation({
      query: (ModelData) => ({
        url: `Model/add/`,
        method: "POST",
        body: ModelData,
      }),
    }),
    getOneModel: build.query({
      query: (id) => `Model/${id}`,
      providesTags: ["Model"],
    }),
    updateModel: build.mutation({
      query: ({ id, ModelData }) => ({
        url: `Model/edit/${id}`,
        method: "PUT",
        body: ModelData,
      }),
    }),
    removeModel: build.mutation({
      query: (id) => ({
        url: `Model/remove/${id}`,
        method: "DELETE",
      }),
    }),

    // Entreprise phase 

    getUser: build.query({
      query: (id) => `Entreprise/${id}`,
      providesTags: ["Entreprise"],
    }),
    getInvoices: build.query({
      query: (id) => `Invoice/List/${id}`,
      providesTags: ["Invoices"],
    }),
    getOneInvoice: build.query({
      query: (id) => `Invoice/${id}`,
      providesTags: ["Invoices"],
    }),
    updateInvoice: build.mutation({
      query: ({ id, InvoiceData }) => ({
        url: `Invoice/edit/${id}`,
        method: "PUT",
        body: InvoiceData,
      }),
    }),
    addInvoice: build.mutation({
      query: (invoice) => ({
        url: `Invoice/add`,
        method: "POST",
        body: invoice,
      }),
    }),
    removeInvoice: build.mutation({
      query: (id) => ({
        url: `Invoice/remove/${id}`,
        method: "DELETE",
      }),
    }),
    // produit entreprise
    addProduit: build.mutation({
      query: (produit) => ({
        url: `Produit/add`,
        method: "POST",
        body: produit,
      }),
    }),
    getProducts: build.query({
      query: (id) => `Produit/Entreprise/${id}`,
      providesTags: ["Products"],
    }),
    getOneProduit: build.query({
      query: (id) => `Produit/${id}`,
      providesTags: ["Products"],
    }),
    updateProduit: build.mutation({
      query: ({ id, ProduitData }) => ({
        url: `Produit/edit/${id}`,
        method: "PUT",
        body: ProduitData,
      }),
    }),
    removeProduit: build.mutation({
      query: (id) => ({
        url: `Produit/remove/${id}`,
        method: "DELETE",
      }),
    }),


    // client entreprise
    addClient: build.mutation({
      query: (client) => ({
        url: `Client/add`,
        method: "POST",
        body: client,
      }),
    }),
    getClients: build.query({
      query: (id) => `Client/Entreprise/${id}`,
      providesTags: ["Clients"],
    }),
    getOneClient: build.query({
      query: (id) => `Client/${id}`,
      providesTags: ["Clients"],
    }),
    updateClient: build.mutation({
      query: ({ id, client }) => ({
        url: `Client/edit/${id}`,
        method: "PUT",
        body: client,
      }),
    }),
    removeClient: build.mutation({
      query: (id) => ({
        url: `Client/remove/${id}`,
        method: "DELETE",
      }),
    }),


    getSales: build.query({
      query: () => "Invoice/summary",
      providesTags: ["Sales"],
    }),
    getDashboardClient: build.query({
      query: (id) => `Invoice/dashboard/${id}`,
      providesTags: ["Dashboard"],
    }),
    getInvoiceDetails: build.query({
      query: (id) => `Invoice/details/${id}`,
      providesTags: ["Invoices"],
    }),
    // Categorie
    addCategory: build.mutation({
      query: (categorieData) => ({
        url: `Categorie/add/`,
        method: "POST",
        body: categorieData,
      }),
    }),
    getAllCategories: build.query({
      query: (id) => `Categorie/Entreprise/${id}`,
      providesTags: ["Categorie"],
    }),
    getOneCategorie: build.query({
      query: (id) => `Categorie/${id}`,
      providesTags: ["Categorie"],
    }),
    updateCategorie: build.mutation({
      query: ({ id, categorie }) => ({
        url: `Categorie/edit/${id}`,
        method: "PUT",
        body: categorie,
      }),
    }),
    removeCategorie: build.mutation({
      query: (id) => ({
        url: `Categorie/remove/${id}`,
        method: "DELETE",
      }),
    }),
    getOneAuth: build.query({
      query: () => `auth/google/`,
      providesTags: ["Auth"],
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
  useUpdateEntrepriseMutation,
  useRemoveEntrepriseMutation,
  useLoginEntrepriseMutation,
  useRegisterEntrepriseMutation,
  useGetEntrepriseByGoogleIdQuery,
  useForgoutPasswordMutation,
  useResetPassMutation,
  useGetPacksQuery,
  useGetOnePackQuery,
  useAddPackMutation,
  useUpdatePackMutation,
  useRemovePackMutation,
  useGetThreePacksQuery,
  useGetAllPacksThreeServiceQuery,

  useGetAllServicesQuery,
  useGetOneServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useRemoveServiceMutation,

  useGetAllModelsQuery, 
  useGetOneModelQuery,
  useAddModelMutation,
  useUpdateModelMutation,
  useRemoveModelMutation,

  useGetSubscriptionsQuery,
  useAddSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useRemoveSubscriptionMutation,
  useGetOneSubscriptionQuery,
  useGetSubscriptionEntQuery,

  useGetMessagesQuery,
  useRemoveMessageMutation,
  useGetAllMessagesQuery,
  useAddMessageMutation,
  
  // Entreprise fnc
  useAddInvoiceMutation,
  useGetUserQuery,
  useGetInvoicesQuery,
  useRemoveInvoiceMutation,
  useGetSalesQuery,
  useGetDashboardClientQuery,
  
  useGetProductsQuery,
  useAddProduitMutation,
  useGetOneProduitQuery,
  useUpdateProduitMutation,
  useRemoveProduitMutation,

  useAddClientMutation,
  useGetOneClientQuery,
  useUpdateClientMutation,
  useRemoveClientMutation,  
  useGetClientsQuery,

  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useGetOneCategorieQuery,
  useUpdateCategorieMutation,
  useRemoveCategorieMutation,

  useGetInvoiceDetailsQuery,

  useGetOneInvoiceQuery,
  useUpdateInvoiceMutation,
  useGetOneAuthQuery,
} = api;

