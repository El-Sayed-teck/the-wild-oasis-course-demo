import { useQuery } from "@tanstack/react-query";
//import { getCabins } from "../../services/apiCabins";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking(){
  /*the bookingId we can get it from the url in BOokingDetails,
  but it's bettere to get it here in the hook to make it more independent*/
  const {bookingId} = useParams();
  const {data: booking, isPending, status, error} = useQuery({ 
    queryKey: ['bookings', bookingId],
    /*to fetch the data of a single selcted booking we'll need the bookingId,
    and we can get it from the url params, so we'll use useParams*/
    queryFn: () => getBooking(bookingId),
    // define retry: false
    /*react quary, by default will try to fetch data 3 times,
    in case it faild in the beginning, sometimes that doesn't make mutch sense,
    and so here in this case, not finding the data propaply means
    that it doesn't exist in the first place, and so then there's no point in retring*/
    retry: false,
  }); 
  console.log(booking, isPending, status, error) 
  return {isPending, error, booking}
}