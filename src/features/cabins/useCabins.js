import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins(){
  const {data: cabins, isPending, status, error} = useQuery({ 
    queryKey: ['cabins'],
    queryFn: getCabins,
  }); 
  console.log(cabins, isPending, status, error) 
  return {isPending, error, cabins}
}