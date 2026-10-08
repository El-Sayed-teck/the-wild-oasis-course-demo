import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;
function Select({options, value, onChange, ...props}) { // ...props allows us to get all the rest of the props,
//  without writing all of them one by one
  //console.log(props) /*here we get the whole props obj with type and test prop properties */
  // it will nest the list of options and the current active value
  return (
    /*select will be a controlled element, 
    so it will have the current active value and onChange with the prop onChange from Select,
    no with this we made this component 100% reusable */
    /*if we have the situation in when we receive multiple properties,
    like testProp for example, 
    that all we want to do with them is to pass them right here with {...props},
    the same trick that we used in react hook form, entering js mode and spread the props there */
    <StyledSelect value={value} onChange={onChange} {...props} >
      {options.map(option => <option 
        key={option.value} 
        value={option.value}>
        {option.label}
      </option>)}
    </StyledSelect>
  )
}

export default Select
