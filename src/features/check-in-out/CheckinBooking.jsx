import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox"

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  /*we need a piece of state to check-in booking and make the check-in btn reactive,
  to help worker conferm if a guest has paied or not,
  for this we'll also use a checkbox */
  const [confirmPaid, setConfirmPaid] = useState(false);

  /*a piece of state to allow guests to check breakfast, 
  if they haven't do it yet */
  const [addBreakfast, setAddBreakfast] = useState(false);

  // for breakfast price, we'll use settinh option from useSettings()
  const {settings, isPending: isLoadingSettings} = useSettings();

  const {booking, isPending} = useBooking()

  useEffect(() => {
    function confirmPaid(){
      setConfirmPaid(booking?.isPaid ?? false)
      
    }confirmPaid() }
    ,[booking])
  
  const moveBack = useMoveBack();

  
  const {checkin, isCheckin} = useCheckin()

  if(isPending || isLoadingSettings) return <Spinner />

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  /*let's calculate the price of breakfast from setting from useSettings()*/
  const optionalBreackfastPrice = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    /*before updating the status and isPaid,
    let's check if the payment has been received*/
    if(!confirmPaid) return;

    /*let's pass in all the relivant data to the ckeckin mutationFn,
    to update the state in supabase api */
    if(addBreakfast){
      /*here we'll pass in now that braeckfast will be set to true,
      and we'll neeed to pass in the new prics,
      so new extraPrices and totalPrice */
      checkin({bookingId, breakfast:{
        hasBreakfast: true,
        estraPrice: optionalBreackfastPrice,
        totalPrice: totalPrice + optionalBreackfastPrice,
      }})
    }else{

      checkin({bookingId, breakfast: {}});
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/*a box to allow the guest to ckeck braeckfast, 
      if he hasn't done it yet, also we'll render this box only
      if the geust didn't choose breakfast initiall, so when hasBreakfast is false */}
      {!hasBreakfast && <Box>
        <Checkbox 
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast(add => !add);
           
            setConfirmPaid(false);         
            /*so that we can confirm that the guesthas paid everything */   
            }} id="breakfast" >
          Want to add breakfast for {formatCurrency(optionalBreackfastPrice)}?
        </Checkbox>      
      </Box>}

      {/*a checkbox to conferm if the guest ha paid or not */}
      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckin}
          onChange={() => setConfirmPaid(confirm => !confirm)}
          id="confirm">
          I confirm that {guests.fullName} has paid the total 
            amount of {!addBreakfast ? formatCurrency(totalPrice):
            /* after checking optional brackfast, during the check in
             the total price will be the paid price + optional breakfast price */
              `${formatCurrency(totalPrice + optionalBreackfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreackfastPrice)})`}</Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin}
        /*here is confirmed is false so it's true we would not be click on this btn */
          disabled={!confirmPaid || isCheckin}
          >Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
