import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";


function SignupForm() {
  const {signup, isPending} = useSignup()
  const {register, formState, getValues, handleSubmit, reset} = useForm();
  const {errors} = formState;

  function onSubmitHnadler({fullName ,email ,password}){
  
    signup({fullName, email, password},{
      onSettled: () => reset(),
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitHnadler)}>
      <FormRow label="Full name" error={errors?.fullname?.message}>
        <Input type="text" id="fullName" disabled={isPending}
        {...register('fullName', {required: "this field is required"})} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
       
        <Input type="email" id="email" disabled={isPending}
        {...register('email', {
          required: "this field is required",
          pattern:{
            value: /\S+@\S+\.\S+/,
            message: "Please, provide a valid email"
          } })}/>
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
       
        <Input type="password" id="password" disabled={isPending}
        {...register('password', {
          required: "this field is required", 
          minLength: {value: 8, message: "Password needs a minimum of 8 characters",}})} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
       
        <Input type="password" id="passwordConfirm" disabled={isPending}
        {...register('passwordConfirm', {
          required: "this field is required",
         
          validate: value => value === getValues("password") || "Passwords need to match",
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" 
          disabled={isPending}
          onClick={reset}
          
        >
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
