import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  // we can destruct the setting obj like that
  const {isPending, error, settings:{
    nimBookingLength, // it's minBookingLength but in supabase i wrote it wrong
    maxBookingLength,
    maxGuestBooking,
    breakfastPrice,

  } = {} /*since the setting at the beginning are undefined,
   we can do he trick of setting them to an empty obj,
   so we would try to pull these infos from an empty obj, 
   which is undefined whicg is no problem */
} = useSettings()

  // let's use useUpdateSetting hook to update the data
  const {isUpdating, updateSetting} = useUpdateSetting()

  function handleUpdate(e, fieldName){
    const {value} = e.target;
    //console.log(value)
    if(!value) return;
    // we update the value basing on the filed name,
    /*and it's in an array because that's what vscode wants */
    updateSetting({[fieldName]: value})
  }

  if(isPending) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
      
        <Input type='number' id='min-nights' 
        defaultValue={nimBookingLength}
        disabled={isUpdating}
        onBlur={e => handleUpdate(e, "nimBookingLength")}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' 
        defaultValue={maxBookingLength} 
        disabled={isUpdating}
        onBlur={e => handleUpdate(e, "maxBookingLength")}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' 
        defaultValue={maxGuestBooking}
        disabled={isUpdating}
        onBlur={e => handleUpdate(e, "maxGuestBooking")}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' 
        defaultValue={breakfastPrice}
        disabled={isUpdating}
        onBlur={e => handleUpdate(e, "breakfastPrice")}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
