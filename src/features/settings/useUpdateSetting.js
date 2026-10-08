import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting(){
  const queryClient = useQueryClient()
  
    // a mutation for editing
    const {mutate: updateSetting, isPending: isUpdating} = useMutation({
      mutationFn: updateSettingApi,
      onSuccess: () => {
        toast.success("Setting successfully edited");
        // invalideQueries to trigger a re-fetch
        queryClient.invalidateQueries({queryKey: ["settings"]})
      },
      onError: (err) =>toast.error(err.message)
    });

    return {isUpdating, updateSetting}
}