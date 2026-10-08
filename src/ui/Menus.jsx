import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "./useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  /*the right and top css properties,
  comes from the position prop, 
  so basically here we need to pass in the x and the y coordinates of this menu
  becasue we want is to be displayed exactly below the btn
  that will appear there.*/
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// Menus context
const MenusContext = createContext()

function Menus({children}){
  // a state to keep track which one is the currently open ID
  const [openId, setOpenId] = useState('');

  // storing the menu postion coords
  const [position, setposition] = useState(null)

  // setter funstions
  const close = () => setOpenId('');
  const open = setOpenId

  return(
    <MenusContext.Provider value={{openId, close, open, 
    position, setposition}}>
      {children}
    </MenusContext.Provider>
  )
}


// let's implement Button, Menu(whic is just a styled component), Toggle and List
function Toggle({id}){
  const {openId, close, open, setposition} = useContext(MenusContext)

  function handleClick(e){
    /*here we'll stop the propagarion of the event */
    e.stopPropagation();
    
    
    const rect = e.target.closest('button').getBoundingClientRect()
    console.log(rect) 
    setposition({
      x: window.innerWidth - rect.width + rect.x - 1820, // i added 1820px becaise the element position was wrong
      y: rect.y + rect.height + 8, // 8 is 8 px
    })

    
    openId === '' || openId !== id ? open(id) : close();
   
  }

  /*here we want to return styledToggle */
  return <StyledToggle onClick={handleClick}>
    <HiEllipsisVertical/>
  </StyledToggle>
}


function List({id, children}){
  /*here we'll get the the id from the context */
  const {openId, position, close} = useContext(MenusContext)
  
  
  const {ref} = useOutsideClick(() => {
   
    close()
    
    }, false)

  if(openId !== id) return null;
  return  createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>, document.body
  )
}

function Button({children, icon, onClick}){
  const {close} = useContext(MenusContext)

  function handleClick(){
    onClick?.() // we want to conditionaly call onClick() if it's present, 
    // so optional chaining

    // after wards we want to close our menu
    close();
  }

  /*this will return a list item,
  because it will be inside the List child comp of Menus,
  so List will be an unordered list */
  return<li>
    <StyledButton onClick={handleClick}>
      {icon}<span>{children}</span>
    </StyledButton>
  </li>
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus