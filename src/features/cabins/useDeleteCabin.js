import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCabin(){
   // a hook to get the queryClient instance deom app.jsx, to let the user invalidate the cache
  // it's useQueryClient
  const queryClient = useQueryClient()
  const {isPending: isDeleting, mutate: deleteCabin} = useMutation({
  
  mutationFn: deleteCabinApi,
  onSuccess: () =>{
    toast.success("Cabin successfully deleted") 
    queryClient.invalidateQueries({
      queryKey: ['cabins']
    });    
  },
  
  onError: (err) => toast.error(err.message) 
})
  console.log(queryClient);

  return {isDeleting, deleteCabin}
}


