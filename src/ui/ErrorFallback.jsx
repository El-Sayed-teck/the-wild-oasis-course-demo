import styled from "styled-components";
import Heading from "./Heading";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

/*this componenet will reciuve the error that occured,
also this comp has access to the prop onReset 
and it's called resetErrorBoundary */
function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <>
    <GlobalStyles />
    <StyledErrorFallback>
      <Box>
        <Heading as="h1">Something went wrong🤔</Heading>
        <p>{error.message}</p>
        {/*these two messages on their owen are not very useful for the user,
        so we'll add a btn to allow the user to go back the app home screen,
        for this we'll use the callback function in the onReset prop in ErrorBoundry comp,
        and use it in the onClick prop*/}
        <Button size="large" onClick={resetErrorBoundary}>Try again</Button>
      </Box>
    </StyledErrorFallback>
    </>
  )
}

export default ErrorFallback
