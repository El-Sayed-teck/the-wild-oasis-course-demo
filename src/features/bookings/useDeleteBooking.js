import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking(){
  const queryClient = useQueryClient();
  const {mutate: deleteBook, isPending: isDeleteBooking} = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success(`Booking successfully deleted`);
      queryClient.invalidateQueries({queryKey: ['bookings']})
    },
    onError: (err) => toast.error(err),
  })

  return {deleteBook, isDeleteBooking}
}