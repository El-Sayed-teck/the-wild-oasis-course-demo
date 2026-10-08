import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser(){
  /*this hook will get the current user and store it into cache,
  so that it don't have to be redowinloaded each time that it's necessary */
  const {data: user, isPending, isFetching } = useQuery({
    queryKey:["user"],
    queryFn: getCurrentUser,
  })
  /*if user?.role === "authenticated" is true, then isAuthenticated: true  */
  return {isFetching, isPending, user, isAuthenticated: user?.role === "authenticated"};
}