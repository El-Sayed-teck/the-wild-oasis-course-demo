import { getToday } from "../utils/helpers";
import supabase from "./superbase";
import { PAGE_SIZE } from "../utils/constants";

// getBookings
export async function getBookings({filter, sortBy, page}){
 
  let query = supabase
  .from('bookings')
 
  .select("id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
    /*in .select() i can add e secon argument, an obj with count property*/
    {count:"exact"}
   
  )
   
  // FILTER
  /*to make the query recive the method(like .eq or gte) ed do this,
  and if that method is not passed in then we specify the default "eq" method */
  if(filter) query = query[filter.method || "eq"](filter.field, filter.value)

  // SORT
  /*here we use .order() method not .sort() for sorting logic,
  and also we can pass an obj of options in .order() 
  where we can specify the ascending option,*/
  if(sortBy) query = query.order(sortBy.field, {
    /*this optio takes a boolean, saying whether the direction 
    is ascendig or not, 
    in it we check if sortBy.direction === "asc", to get true or false*/
    ascending: sortBy.direction === "asc",
  })
  /**ofcourse like filter logic, we get a new entry in the query cache for ever sort option we chose,
  in the cach we can have up to 16 combonations of filter and sort options mixed together
   */

  // PAGINATION
  if(page) {
   
     const from = (page - 1) * PAGE_SIZE; 

    //calculating to
     const to = from + PAGE_SIZE - 1; 

    console.log("PAGE:", page);
    console.log("FROM:", from);
    console.log("TO:", to);

      console.log("🔥 PAGINATION DEBUG", {
    page,
    PAGE_SIZE,
    from,
    to,
  });

    // range() is a supabase method
    query = query.range(from, to);
  }
  
  const { data, error, count } = await query;
  /*this query will also return a variable,
  a property called count */

  if(error){
    console.error(error)
    throw new Error(`Bookings could not be loaded`)
  }

  /*and also return that count property with data in an obj */
  return { data, count};
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. 
// Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  // this function need to receive the date in ISOstring, this what supabase expects here
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, estraPrice")
    .gte("created_at", date) // here we get booking after the passed date
   
    .lte("created_at", getToday({ end: true })); 
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

 
  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");
    

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
