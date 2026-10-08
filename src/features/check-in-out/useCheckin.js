import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin(){
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {mutate: checkin, isPending: isCheckin} = useMutation({
    mutationFn: async ({bookingId, breakfast}) => updateBooking(bookingId, {
      status: "checked-in",
      isPaid: true,
      ...breakfast,
      
    }),
    /*the data that is passed into onSuccess is the data 
    that is return from the mutationFn */
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      
      queryClient.invalidateQueries({active: true})
      // finally we also want to naviagte to the dashboard
      navigate("/")
    },
    onError: () => toast.error("There was an error while checking in"),
  })

  return {checkin, isCheckin}
}