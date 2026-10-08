import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HiOutlineCalendarDays, HiOutlineCog6Tooth, HiOutlineHome, HiOutlineHomeModern, HiOutlineUsers } from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

// const Link = styled.a`
//   &:link,
//   &:visited {
//     display: flex;
//     align-items: center;
//     gap: 1.2rem;

//     color: var(--color-grey-600);
//     font-size: 1.6rem;
//     font-weight: 500;
//     padding: 1.2rem 2.4rem;
//     transition: all 0.3s;
//   }
  /*we want this a styled component to be applied to NavLink comp from react-route,
  so we'll use this styled component trick: using styled(any elemnt we want)
  to make a custom styled component */
  const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited {
      display: flex;
      align-items: center;
      gap: 1.2rem;
  
      color: var(--color-grey-600);
      font-size: 1.6rem;
      font-weight: 500;
      padding: 1.2rem 2.4rem;
      transition: all 0.3s;
    }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

/*to add icons we'll use the react-icons library,
we are gonna use the set heroicons 2 from this library,
which is part of tailwind, to know how to use these icons look in the docs,
we're gonna use this import { theIcon that we want } from "react-icons/hi2"; 
then we're gonna place it as a component in our jsx*/

function MainNav(){
  return(
    <nav>
      <NavList>
        <li>
          {/* <NavLink to="/dashboard">HOME</NavLink> */}
          {/*we make a custom styled component for the react router component NavLink */}
          <StyledNavLink to="/dashboard">
          <HiOutlineHome/>
          <span>Home</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/bookings">
          <HiOutlineCalendarDays />
          <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins">
          <HiOutlineHomeModern/>
          <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
          <HiOutlineUsers />
          <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
          <HiOutlineCog6Tooth />
          <span>Settings</span>
          </StyledNavLink>
        </li>
        
      </NavList>
    </nav>
  )
}
export default MainNav