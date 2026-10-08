import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({bookings, confirmedStays, numDays, cabinCount}) {
  /*here we'll start by receiving some data bookings, confirmedStays,
  then we'll start calculating*/
  // 1. 
  const numbBookings = bookings.length;

  // 2. total sales
  /*we get this from adding together all the total prices
  from all bookings */
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)

  // 3. total check-ins
  /*they are the confirmedstays.length */
  const checkins = confirmedStays.length;
  /*here we have thye checkin where the guests actually showed */

  // 4. occupancy rate
 
  const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount)

  return <>
    <Stat title="Bookings" color="blue" 
      icon={<HiOutlineBriefcase/>}
      value={numbBookings} />
    <Stat title="Sales" color="green" 
      icon={<HiOutlineBanknotes/>}
      value={formatCurrency(sales)} />
    <Stat title="Check ins" color="indigo" 
      icon={<HiOutlineCalendarDays/>}
      value={checkins} />
    <Stat title="Occupancy rate" color="yellow" 
      icon={<HiOutlineChartBar/>}
      value={Math.round(occupation * 100) + "%"} />
    
  </>
}

export default Stats
