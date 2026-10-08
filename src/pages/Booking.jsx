import BookingDetail from "../features/bookings/BookingDetail"

function Booking() {
  return (
    /*here we'll display the booking detail,
    in the bookings feature folder */
    /*remember a page should not fetch data and not have any side effects,
    it make the page cleaner(developers pattern), 
    so we'll just use BookingDetails.jsx and that's it */
    <BookingDetail />
  )
}

export default Booking
