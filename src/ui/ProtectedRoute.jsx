import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
` 

function ProtectedRoute({children}) {
  const navigate = useNavigate()
  /*children will return when the user is correctly authenticated */
  // 1. Load the authenticated user
 
  const {isFetching ,isPending, isAuthenticated} = useUser()
  
  // 2. if there is no authenticated user, redirect to the login page
  
  useEffect(function(){
    
    if(!isAuthenticated && !isFetching) navigate("/login")
      
    }, [navigate, isAuthenticated, isFetching])
    
  // 3. while loading, show a spinner
  if(isPending) return <Fullpage> <Spinner /> </Fullpage>

  // 4. if there is a user(isAuthenticated is true), render the app(return the children)
  if(isAuthenticated) return children;
}

export default ProtectedRoute
