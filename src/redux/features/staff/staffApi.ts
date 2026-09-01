import { baseApi } from '@/redux/baseApi';

export interface StrapiMedia {
  url?: string;
}

export interface StaffRecord {
  documentId: string;
  name: string;
  specialty?: string;
  bio?: string;
  photo?: StrapiMedia | null;
}

interface StaffResponse {
  data: StaffRecord[];
}

export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query<StaffResponse, void>({
      query: () => ({
        url: '/staff?populate=*',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetStaffQuery } = staffApi;
