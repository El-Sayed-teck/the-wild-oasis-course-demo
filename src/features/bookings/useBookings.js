import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings(){
  // query client for pre-fetching logic
  const queryclient = useQueryClient();

  /*this is the perfect place 
  where we can read the value and then pass it into "getBookings" function,
  the alternatice would be wrighting the data inside the BookingTable.jsx,
  and then pass it into useBookings(), but that would add an addional step,
  so we'll start here in useBookings(),
  we are doing this in the first place because getBookings gives us 
  the bookings as they are, without having to pass in any thing into it,
  and this make everything more flexible, so we'll use useSearchParams here*/
  const [searchParams] = useSearchParams()

  // Let's search teh filter value
  const filterValue = searchParams.get("status")
  /*the idea is to bass in getBookings and obj of options,
  that will conatine the objs filter and sortBy, that will be used to tell
  getBookings which filtered data to download, so we need to build the filter obj*/
  const filter = !filterValue || filterValue === "all"? 
    null : 
    {field: "status", value: filterValue} /*if there is no filtervalue,
 /* or if the filterValue is 'all', then we don't want to do anything, so there is no need for any filter.
  so in this case the filter is null and getBooking will download all the data 
  without filetring anything, else filter will be the obj that we talked about,
  field: "status" and the value we get in filterValue*/

  // just jonas testing
  // filter totalPrice greater to 5000
  /*to make the .eq() block dynamic we'll pass the anme of the method that we
  want getBookings to use after await query. , 
  so dynamically we'll receive that methdo, in method property,
  so gte()*/
   //{field: "totalPrice", value: 5000, method:"gte"}
   /*now onther then using one condition like totalePrice or status,
   we can add more conditions at the same time, like
   filter all the bookings that are checked-in and totalPrice greater then 5000 ecc ecc,
   so for this we rather than passing an obj, we can pass an array of obj
   in which every obj is a consition/filter option,
   and in getBookings, we can loop through that array, and each
   element of that array will have a quary variable (like if(filter !== null) query = query[filter.method || "eq"](filter.field, filter.value)) that fetch it's filtered data,
   so we can filter with more then one condition at the same time*/

  /* for sorting we get the sorted data and pass it into the get booking functions,
   */
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction};
   /**ofcourse like filter logic, we get a new entry in the query cache for ever sort option we chose */

  // pagination 
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page")) /*if there is no "page" in the url,*/
 
  console.log("URL:", searchParams.toString());
  console.log("PAGE:", page);
  console.log("FILTER:", filter);


   /*sicne the data is now and obj of data and count, we can deconstruct it,
   but we set it to {} as a default becasue count:"exact",
   asks Supabase to also calculate the exact total number of rows.
   That can make the query take longer than simply fetching the data, 
   so there can be an initial period where React Query hasn't received the result yet. */
  const {
      data: {data: bookings, count} ={}, 
      isPending, 
      error} = useQuery({ 
    queryKey: ['bookings', filter, sortBy, page], /*since the filter obj changes the query is not refetched,
    it's only fetched after a refresh, so to trigger a refetch in the queryKwy
    we also add the filter obj that we made, telling React query
    that whenever this filter obj chnages, then react query will re-fetch
    the data, so we can think the querykey array as a dependency array 
    of useQuery like useEffect*/
    /*react-quary devtools, at the start we get ["bookings", null] the filterObj at the start is null,
    when we click on "checked-in", we get ["bookings",{"field":"status","value":"checked-in"}]
    and there is a refetch, the same here with "unconfirmed" ["bookings",{"field":"status","value":"unconfirmed"}],
    and also it's the same for "checked-out" ecc ecc
    so a new entry in the query cache was created, every time the filter obj chnages,
    so a one for "unconfirmed" case was creaded and it containe all the unconfimerd data,
    the same for checked-in and out.
    This means that everytime we click on a filter option, a new entry was created in the query cache
    that is linked to the option that we clicked in teh filter options,
    this is the power of react query, and we can move from o0ne entry to another
    effortlessly*/

    /*let's pass this filter obj into the getBookings */
    queryFn: () => getBookings({filter, sortBy, page}),

  }); 

  // 383 PRE-FETCHING
  // PRE-FETCHING THE NEXT PAGE
  /*we want to do the prefetch if we are not on the last page, */
  const  pageCount = Math.ceil(count / PAGE_SIZE)
  
  /* we want this prefetch to run if page in less then pageCount  */
  if(page < pageCount)
  /*for prefetch, we need to do is to call the queryclient and use th prefetchQuery(),
  like imvalidatequary, we nee the queryKey,
  and for the page, we want to prefetch the next page, so page + 1,
  so after fetching page number 1, we want prefetch page 2 before it's rendered on the ui  */   
    queryclient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1], 
      /**here since page is an obj we'll so page: page+1 */
      queryFn: () => getBookings({filter, sortBy, page: page + 1}),
      /*now in react query devtool, after the data of page 1 was loaded and rendered,
      in cache we see page 1 data and also page 2 data, so we got the data of page 1 fetched and
      page 2 prefetched, now if we go to page 2 the data is immediatelly availabe and there is no loading spinner,
      and the data of page 3 was prefetched in the cache immediatelly.
      */
      /*now when we render the last page num 8, the data of page 9 is prefetched,
      and it's indeed empty, becauere there is no data at all, this prefetch is not neccesary,
      so we'll do the prefetch only if we are not on the last page, so we'll use an if statment above,
      now after the if statment, when we get to the last page 8, the data of page 9
      is not pre-fetched, because it doesn't exist */  
    })

    // PRE-FETCHING THE PREVIOUS PAGE
    /*prefetch teh previous page if, 
    page is greater then 1, or if we're not on page 1 */
     if(page > 1)
      queryclient.prefetchQuery({
        queryKey: ['bookings', filter, sortBy, page - 1], 
        queryFn: () => getBookings({filter, sortBy, page: page - 1}),
    })
  /*now with these pre-fetching prev and next datas, we can confontably move between
  next and prev pages without paging loading of fetching data,
  so the user will never see any loading spinner,
  so this will looks as if the data would actually be paginates on the front end,
  while in reality we know that this data is indeed actually fetched from the server.
  but sice it's prefetched we really don't notice it*/

  //console.log(bookings, isPending, status, error) 
  return {isPending, error, bookings, count}
}
