import styled, { css } from "styled-components";
import Button from "./Button";

const Row = styled.div`
  display: flex;
  /*({type = "vertical"}) this is the deconstruction of the props obj 
  and assigning it's property type to the default value "vertical" */
  ${({type = "vertical"}) => type === 'horizontal' && css`
    justify-content: space-between;
    align-items: center;
    `}
  ${({type = "vertical"}) => type === 'vertical' && css`
    flex-direction: column;
    gap: 1.6rem;
    `}
`;

/*On any react(react thing) components we can set default props,
by adding this we can omit teh type in <Row></Row> when we are using <Row>
on it's own */
// this is not working anymore
Row.defaultProps ={
  type: "vertical",
}

export default Row