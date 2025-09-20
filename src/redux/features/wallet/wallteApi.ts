import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation({
      query: (payload) => ({
        url: "/wallet/send-money",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["WALLET", "USER"],
    }),
    addMoney: builder.mutation({
      query: (payload) => ({
        url: "/wallet/add-money",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["WALLET", "USER", "TRANSACTIONS"],
    }),
    withdrawMoney: builder.mutation({
      query: (payload) => ({
        url: "/wallet/withdraw",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["WALLET", "USER"],
    }),
    getMyWallet: builder.query({
      query: () => ({
        url: "/wallet/my-wallet",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSendMoneyMutation,
  useWithdrawMoneyMutation,
  useGetMyWalletQuery,
  useAddMoneyMutation,
} = walletApi;
