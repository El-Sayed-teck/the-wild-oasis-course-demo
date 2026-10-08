import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin(){
  const queryClient = useQueryClient()
  
    // a mutation for editing
    const {mutate: editCabin, isPending: isEditing} = useMutation({
      /*normally in rract query mutationFun only pass one argument,
      but we need to bass in it 2 arguments, for editing, so we'll make an arrow function,
      that pass in an argument obj, like toolkit async thunks,
      we then deconstruct the obj and pass if in CreatEditCabin */
      mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
      onSuccess: () => {
        toast.success("Cabin successfully edited");
        // invalideQueries to trigger a re-fetch
        queryClient.invalidateQueries({queryKey: ["cabins"]})
      },
      onError: (err) =>toast.error(err.message)
    });

    return {isEditing, editCabin}
}