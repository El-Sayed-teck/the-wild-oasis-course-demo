import styled, {css} from "styled-components";

/* let's see if we can write css in some external variable */
//const test = 'text-align: center;' // it's working
/*if we wrote big blocks of css in external varaivles,
then we don't get the synthax highligting that we are used to,
so to fix that is to use the ss function and now with i the synctax
is hightlighted in css style*/
const test = css`
  text-align: center;
  /*the css function is unecessary if we wanted to to some logic in there, 
  like some js expression in here and,
  then use that in the Heading componenet,
  this will work the same as font-size: temple literal*/
  /* ${10 > 5 &&  'background-color: yellow;'} */
  ` 

/*to use style on h1 for exapmle we it like this,
style.h1 then templet leteral in which we gonna write our styles */
const Heading = styled.h1`
  /*we can pass prop to thsi compo,
  so that we can use that prop here to conditionaly set come styles */
  /*here we can get access to the prop, entering js mode,
  and using the callback function,
  if prop.type === h1 is true then apply that style,
  we can also use the as prop instead of type */
  ${props => props.type === "h1" &&  css`
    font-size: 3rem;
    font-weight: 600;  
  `} 
  /*we can do the rest with the other h2 and h3, but using the as prop */
  ${props => props.as === "h2" &&  css`
    font-size: 2rem;
    font-weight: 600;  
  `}
  ${props => props.as === "h3" &&  css`
    font-size: 2rem;
    font-weight: 500;  
  `}
  ${props => props.as === "h4" &&  css`
    font-size: 3rem;
    font-weight: 600; 
    text-align: center;
  `}
    
    line-height: 1.4;


`; 
/*this is a temple leteral meaning we can write a javascript expressions in there,
we can considionaly define font-size */
export default Heading
