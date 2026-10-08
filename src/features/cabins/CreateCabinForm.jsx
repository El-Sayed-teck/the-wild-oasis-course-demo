import { useForm } from "react-hook-form";

import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function CreateCabinForm({cabinToEdit = {}, onCloseModal}) { 
  const {isCreating, createCabin} = useCreateCabin()
  const {isEditing, editCabin} = useEditCabin()

  
  const isWorking = isCreating || isEditing 

  
  const {id: editId,...editValue} = cabinToEdit
  

  const isEditSession = Boolean(editId) 

  const {register, handleSubmit, reset, getValues, formState} = useForm({
   
    defaultValues: isEditSession ? editValue : {},
    /*if isEditSession is true, editValue will become defaultValues, else an empty obj */
  });
  
  const {errors} = formState
  console.log(errors) // from formState we get many objs, 
  
  console.log(formState)

  function onSubmit(data){
    const image = typeof data.image === "string" ? data.image : data.image[0]
 
    if(isEditSession) editCabin({newCabinData: {...data, image}, id: editId},{
       onSuccess: (data) => {
        console.log(data)        
        reset();
        onCloseModal?.();
      }
    });
    else createCabin({...data, image: image},
      /*here we'll pass and obj of option, to pass in the onSuccess function from useCreateCabin()
      to here in the edit function */
      {
      
        onSuccess: (data) => { 
          console.log(data) 
          reset();
          onCloseModal?.();
        },
      }
    )
    console.log(data);  
  }
  function onError(errors){
    console.log(errors) // actualluy the error obj comes from formState, not onErrors
  }
  
  return (
    /*if onCloseModal exist styling type will be 'modal' else 'regular' */
    <Form type={onCloseModal ? "modal": 'regular'} onSubmit={handleSubmit(onSubmit, onError)}>      
      <FormRow label="Cabin name" error={errors?.name?.message}>         
        <Input type="text" 
          id="name" 
          disabled={isWorking}
          {...register('name', {
          required: "This filed is required", 
          
        })} />
      </FormRow>  
     
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" 
          disabled={isWorking}
          {...register("maxCapacity", {
          required: "This filed is required",
          // we can also set a minimum value and max value
          min:{ // here we'll specify teh minimum value
            value: 1,
            // we can also specify the message in case validation failds
            message: "Capacity should be at least 1", // this message will appear in the error obj produced from onError
          }
        })} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" 
          disabled={isWorking}
          {...register("regularPrice", {
          required: "This filed is required",
        })}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" 
          defaultValue={0} 
          disabled={isWorking}
          {...register("discount", {
           required: "This filed is required",
           validate: (value) => Number(value) <= Number(getValues().regularPrice) || "Discount should be less than regular price",
         
        })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" 

          defaultValue="" 
          {...register("description", {
          required: "This filed is required",
        })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*"
          {...register("image", {
           
            required: isEditSession ? false : "This filed is required",
          })} />
      </FormRow>

      <FormRow2>
       
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button> 
        
        
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow2>
    </Form>
   
  );
}

export default CreateCabinForm;
