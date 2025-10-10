import {
  useQuery,
  type UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { getCurrentUserApi } from "./api";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

type CurrentUser = {
  id: string;
  username: string;
};

interface UseCurrentUserQueryParams {
  options?: Omit<
    UseQueryOptions<
      CurrentUser,
      AxiosError<ApiError>,
      CurrentUser,
      readonly string[]
    >,
    "queryKey" | "queryFn"
  >;
}

export function useCurrentUserQuery(
  params?: UseCurrentUserQueryParams
): UseQueryResult<CurrentUser, AxiosError<ApiError>> {
  const options = params?.options;

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUserApi(),
    retry: false,
    ...options,
  });
}
