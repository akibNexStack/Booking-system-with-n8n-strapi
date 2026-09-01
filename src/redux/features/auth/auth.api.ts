import { baseApi } from "@/redux/baseApi";
import type { IResponse, ISendOtp, IVerifyOtp } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login mutation
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/local",
        method: "POST",
        data: {
          identifier: userInfo.email,
          password: userInfo.password,
        },
      }),
      invalidatesTags: ["USER"],
    }),
    // -------------------------------

    // logout mutation
    logout: builder.mutation({
      queryFn: async () => {
        localStorage.removeItem("strapi_jwt");
        return { data: null };
      },

      // Invalidate the USER tag to refetch user info after logout
      invalidatesTags: ["USER"],
    }),
    // -------------------------------

    // register mutation
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/local/register",
        method: "POST",
        data: {
          username: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
        },
      }),
      invalidatesTags: ["USER"],
    }),
    // -------------------------------

    // send OTP mutation
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    // -------------------------------

    // verify OTP mutation
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    // -------------------------------

    // get user info
    userInfo: builder.query({
      query: () => ({
        url: "/users/me?populate=role",
        method: "GET",
      }),

      //for automatic refetching of user data
      providesTags: ["USER"],
    }),
    // -------------------------------
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = authApi;
