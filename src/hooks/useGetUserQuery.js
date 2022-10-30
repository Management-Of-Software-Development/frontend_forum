import {useCacheFetch} from "./useCacheFetch";

export default function useGetUserQuery() {
  const { data, error, isLoading } = useCacheFetch(
    "user",
    {
      onSuccess: (data) => {
        console.log(data);
      },
    },
    {
      url: "/user",
      method: "GET",
      isAuth: true,
    }
  );
  return { data: data?.data, error, isLoading };
}
