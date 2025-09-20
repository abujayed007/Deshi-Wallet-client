import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: () => ({
        url: "/transaction",
        method: "GET",
      }),
      providesTags: ["TRANSACTIONS"],
    }),

    getUserTransctions: builder.query({
      query: () => ({
        url: "/transaction/my-transactions",
        method: "GET",
      }),
      providesTags: ["TRANSACTIONS"],
    }),
  }),
});

export const { useGetUserTransctionsQuery, useGetAllTransactionsQuery } =
  transactionApi;
