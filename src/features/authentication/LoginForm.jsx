import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
//import { login } from "../../services/apiAuth"; // its was for testing
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, isPending} = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if(!email || !password) return
   
  
    // let's now use the login finction returnd from the custom hook useLogin()
    login({email, password},{
      onSettled: () => {
        setEmail("");
        setPassword("")
      }}
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
        
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isPending}>
          {!isPending ? 'Login' : <SpinnerMini/>}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
