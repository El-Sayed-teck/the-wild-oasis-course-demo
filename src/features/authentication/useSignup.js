import { useMutation } from "@tanstack/react-query";
import { signup as signupApi} from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup(){
 const {mutate: signup, isPending} = useMutation({
  mutationFn: signupApi,
  /*the onSuccess will receive the newly created user that is returned
  from the mutation function signupApi */
  onSuccess:(user) => {
    //console.log(user)
    toast.success(`Account successfully created!, 
      please verify the new account from the user's email address`)
  },
  onError:(err) => {
    console.error(err)
    toast.error(err.message)
  }
 })

 return {signup, isPending}
}