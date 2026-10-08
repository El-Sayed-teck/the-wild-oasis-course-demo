import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings(){
  const [searchParams] = useSearchParams()
  
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"))

  
  const queryDate = subDays(new Date(), numDays).toISOString(); /*this asks Give me bookings created within the last 7 days. */
 
  const {isPending, data:bookings} = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`], 
  })

  console.log("numDays:", numDays);
console.log("queryDate:", queryDate);
console.log("bookings:", bookings);

  return {isPending, bookings}
}