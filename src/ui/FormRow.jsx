import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.1rem;

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

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({label, error, children}) {
  // console.log(children) //it's working
  return (
    <StyledFormRow>
      {/*since children will be the input element with it's id,
      to access the id of chilren we can use this trick,
      react elements are js obj, since children will be a react element,
      so chilren obj will be something like this: 
      {
        type: Input,
        props: {
          type: "text", // this is in <input type="text" />
          id: "name"  // this is in <input id="text" />
        }
      } also children.props.id is not accessing the actual DOM input.
       It's accessing the props of the React element.
       by doung console.log(children) i'll see the obj element of 
       children and understand whey we did children.props.id, it turns out that can children was an array of objs, 
       or just an obj od objs*/}
        {label &&  <Label htmlFor={children[0]?.props?.id ||children?.props?.id}>{label}</Label>}
        {children}
        {error&& <Error>{error}</Error>}
      </StyledFormRow>

  )
}

export default FormRow
