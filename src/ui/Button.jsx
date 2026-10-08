import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${props => sizes[props.size]} /* this object[] notation,
  it's simply js, form this varaiations obj we take the property
  that has whatever name we are inputting in <Button variations="primary"> for example,
  so whatever we are inpitting the prop variation, it will be put in the props obj
  and then used to get a property from the variations obj, in this case.
  Here, variations is the object containing all your possible styles.
  But in your component: <Button variation="secondary" />
  variation is the prop that tells you which property to retrieve from the variations object.*/
  //${(props) => variations[props.variation]}

  // for default value
  ${({variation = "primary"}) => variations[variation]} 
  ${({size = "medium"}) => sizes[size]}
`;


export default Button