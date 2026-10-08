import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  // let's use useBooking() to fetch data from a single booking
  const {booking, isPending} = useBooking() // booking at the start is undefined
  const {checkout, isCheckOut} = useCheckout()
  const {deleteBook, isDeleteBooking} = useDeleteBooking()
  const navigate = useNavigate()
  const moveBack = useMoveBack();
  
  if(isPending) return <Spinner />; 
  // first render booking = undefined
      //isPending = true
          //  ↓
      //return <Spinner /> 
      
  /*if the user entered and id that doesn't exist,
  bookingId become undefined ofcourse becasue the booking of that not-existing
  bookingId doesn't exist in the first place, so we do this conditional rendering  */    
  if(!booking) return <Empty resourceName="booking"/>
  /*now we get the info that no booking could be found */
  
  const bookingId = booking.id; // then if the if-statment is false, get the bookingID
  //console.log(booking) /*it's like a guard clause */

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[booking.status]}>{booking.status?.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {/*a btn to be rendered when status of the booking is unconfirmed, 
        so that it can be checked-in */}
        {booking.status === "unconfirmed" && <Button 
          onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check-in
          </Button>}

        {booking.status === "checked-in" && <Button
          onClick= {() => checkout(bookingId)}>
          Check out
        </Button>}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation = "danger">
              Delete booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName="booking"
            disabled={isDeleteBooking}
        
            onConfirm={() => deleteBook(bookingId, {
            onSettled: () =>navigate(-1),
            
          })}
            />
          </Modal.Window>
        </Modal>  

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
