import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: (params) => ({
        url: "/transaction",
        method: "GET",
        params: params,
      }),
      providesTags: ["TRANSACTIONS", "WALLET"],
    }),

    getUserTransctions: builder.query({
      query: (params) => ({
        url: "/transaction/my-transactions",
        method: "GET",
        params: params,
      }),
      providesTags: ["TRANSACTIONS", "WALLET"],
    }),
  }),
});

export const { useGetUserTransctionsQuery, useGetAllTransactionsQuery } =
  transactionApi;
