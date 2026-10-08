import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "./useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

/*now we'll make this component a compound component, 1- we'll start with creating a context */
const modalContext = createContext();

// 2- creating the parent component
function Modal({children}){
  const [openName, setOpenName] = useState('')
  /*here is where we'll keep track of which is the currentluy open window*/

  // handler functions, to close and open the window
  const close = ()=> setOpenName("");
  /*open function is basiclly setting thai openName to
  the opens custom prop, for example "cabin-form" in AddCabin.jsx,
  so the window that has that name, so name prop = "cabin-form" will be displayed*/
  const open = setOpenName;

  return <modalContext.Provider value ={{openName, close, open}}>
    {children}
  </modalContext.Provider>
}

// let's create the btn itself from open and close
function Open({children, opens: opensWindoWName}){
  const {open} = useContext(modalContext)
  /*we want to pass this open function to the Button in the AddCabin.jsx,
  so that is can get access to this state and it's updating functions,
  so we want to add open function to teh children prop,
  so for this we'll use the advanced react function cloneElement(), see the docs */
/*so instead of return children, we'll clone the children and return that,
the clone will be children but with new props, propswill containe the onClick prop
then this onClick prop will become a function that actually opens a modal window
so this function will call open function to open the window that has a chosen name*/
  return cloneElement(children, {onClick: () => open(opensWindoWName)})
}


function Window({children, name}) {
  const {openName, close} = useContext(modalContext)

  // useOutsideClick hook
  const {ref} = useOutsideClick(close, true)
    
  {/*after cloning the button, we pass into it as pros the onClick prop,
    when we need to handle an event and then the event handler in onClick
    is simply the open function that open the windw with the name that we 
    have as a prop name="cabin-form",
    so if name is not the current openName we return nothings,
    else we return the creatPortal jsx*/}
  if(name !== openName) return null;

  return createPortal (
    <Overlay>
      <StyledModal ref={ref} >
        <Button onClick={close}>
          <HiXMark/>
        </Button>
        <div>
          {cloneElement(children, {onCloseModal: close})}
        </div> 
      </StyledModal>
    </Overlay>,
    document.body
  )
}

// implementing the open and close functions as poperties of Model
Modal.Open = Open;
Modal.Window = Window;

export default Modal
