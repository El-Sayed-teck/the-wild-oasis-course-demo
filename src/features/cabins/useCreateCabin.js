import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin(){
  const queryClient = useQueryClient()
  const {mutate: createCabin, isPending: isCreating} = useMutation({
    mutationFn: (newCabinData) => createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      // invalideQueries to trigger a re-fetch
      queryClient.invalidateQueries({queryKey: ["cabins"]})
    },
    onError: (err) =>toast.error(err.message)
  });

  return {isCreating, createCabin}
}