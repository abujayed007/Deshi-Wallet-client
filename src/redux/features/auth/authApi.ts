import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/user/users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getSingleUser: builder.query({
      query: (userId: string) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getAgents: builder.query({
      query: () => ({
        url: "/user/agents",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getAllUserAndAgent: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    changeStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/user/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["USER"],
    }),

    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),

    editProfile: builder.mutation({
      query: (userInfo) => ({
        url: `/user/update-profile/:${userInfo?._id}`,
        method: "PATCH",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserInfoQuery,
  useLogoutMutation,
  useEditProfileMutation,
  useChangeStatusMutation,
  useGetAllUserAndAgentQuery,
  useGetUsersQuery,
  useGetAgentsQuery,
  useGetSingleUserQuery,
} = authApi;
