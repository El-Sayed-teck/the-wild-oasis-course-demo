import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
  // if the FilterButton has active prop true, then apply this style
    props.$active && 
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({filterField, options}) {
  
  /*to store the values in the url we'll use useSearchParams() hook */
  const [searchParams, setSearchParams] = useSearchParams()
  
  /*we'll get the current value to make the active style prop true or not */
  const currentFilter = searchParams.get(filterField) || options[0].value;
  /*in searchParams we get the filterField, or if it doesn't exist
  then we need to again use a default value, which is 'all',
  but we'll write it like this options[0].value ot get the 1° option*/

  function handleClick(value){
   
   
    if(searchParams.get("page")) searchParams.set("page", 1)
   
    searchParams.set(filterField, value);

    

    /*we can take this new search params, and pass it into setSearchParams */
    setSearchParams(searchParams)
   
  }
  return (
    <StyledFilter>
      {
      options.map(option => 
        <FilterButton 
          key={option.value} 
          onClick={() => handleClick(option.value)}
          //active= {option.value === currentFilter ? (true).toString() : undefined}  
          $active={option.value === currentFilter} // $ active is a transient prop, to pass it to teh dom i need the transient prefix $,
          /*becaue html doesn't has the attribut active, so in styled components we use $ to pass the custom atributn ot the dom */ 
          disabled= {option.value === currentFilter} // this will make the already clicked filter btn, to not be clickable
        >
          {option.label}
        </FilterButton>
      )}
    </StyledFilter>
  )
}

export default Filter
