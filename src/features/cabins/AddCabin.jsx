import CreateCabinForm from "./CreateCabinForm"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"


function AddCabin(){
  return (
  <div>
    <Modal>
      <Modal.Open opens="cabin-form">
        
        <Button>Add new cabin</Button>
      </Modal.Open>
     
      <Modal.Window name="cabin-form">
      {/*here we are going to dispaly the content, itself, that's CreateCabinForm */}
        <CreateCabinForm />
      </Modal.Window> 

    </Modal>
  </div>  
  )
}

 export default AddCabin

 /**useful comments
  
 Figured I would try my best to explain what's going on here for those finding this one a little hard to follow. Like many others have said, this video could probably have benefited from being done slower and explained more.



First, we create the context



const ModalContext = createContext();
 
const Modal = ({ children }) => {
const [openName, setOpenName] = useState(null);
const close = () => setOpenName(null);
const open = setOpenName;
return (
    <ModalContext.Provider value={{ openName, close, open }}>
        {children}
    </ModalContext.Provider>
    );
};


In our AddCabin.jsx, we are returning this context, but we are doing it in a way that is different to the way we are used to - we would usually call it <ModalContextProvider>, but this time, just <Modal>



const AddCabin = () => {
    return (
        <Modal>
            //...
        </Modal>
    );
};


This provides its children access to the exposed context APIs. In this case we have exposed openName (state), close (fn), open (fn).

Next we create the child components and add them to the Modal object:

/*
1. accept child components and a string under prop 'opens', but call it opensWindowName
2. get the open(string) func from the context. This func sets state to a string.
3. create a copy of the child component, and set its onClick prop to a function that calls the 'open()' function and passes in the opensWindowName string value 
*/
 
// const Open = ({ children, opens: opensWindowName }) => {
//     const { open } = useContext(ModalContext);
//     return cloneElement(children, { onClick: () => open(opensWindowName) });
// };
 
/* 
1. accept child components and a name string
2. get the openName state, and the close() func from the context. this func sets the name state to null.
3. if the name of this window does not match the openName state, render nothing, otherwise render the JSX
4. create a copy of the child component and into its onCloseModal prop, pass the close() func. 
*/
 
// const Window = ({ children, name }) => {
 
//     const { openName, close } = useContext(ModalContext);
 
//     if (name !== openName) return null;
 
//     return createPortal(
//         <Overlay>
//             <StyledModal>
 
//                 <Button onClick={close}>
//                     <HiXMark />
//                 </Button>
                
//                 <div>{cloneElement(children, { onCloseModal: close })}</div>
//             </StyledModal>
//         </Overlay>,
//         document.body,
//     );
// };
 
// Modal.Open = Open;
// Modal.Window = Window;


// Now we pass these as children to our context (in AddCabin.jsx):



// /*
// <Modal> is context provider only - no elements rendered.
// Renders the child button but adds the onClick prop set to the open func
// renders the window only when the above button has set the openName state to cabin-form
// */
 
// return (
 
//     <Modal>
 
//         <Modal.Open opens='cabin-form'>
//             <Button>Add new Cabin</Button>
//         </Modal.Open>
 
//         <Modal.Window name='cabin-form'>
//             <CreateCabinForm />
//         </Modal.Window>
 
//     </Modal>
// )

// useful comments
// To recap, we now have:

// - A Context called <Modal> which exposes state called openName, 
// and 2 handlers called open() which accepts a string as an argument and updates the openName state to this string, 
// and close() which sets the openName state to null / ''.

// - A component called <Open> which accepts a child and a string prop named opens . 
// It takes the open() handler function from the context, creates a copy of the child component,
// and adds this open() function to the onClick prop of the clone, passing in the opens string.


// - A component called <Window> which accepts a child component and a string prop named name. 
// It takes the openName state and the close() handler function from the context, creates a copy of the child component, 
// and adds this close() function to the onCloseModal prop of the clone. 
// This component has conditional rendering as an output.



// This is the part that is a little confusing, so I'll try to explain as best as I can.


// 1. <Modal> is the context, 
// it's not actually rendering anything, it's only providing access to state and handlers to its children - which are open and window.


// 2. <Open> accepts the button as a child and a string prop (opens). 
// It then creates a copy of the button, and adds the open() function to its onClick prop,
//  with the string prop provided as an argument. It renders the clone button Add New Cabin. 
//  We have told the clone to specifically update the openName state in the context to cabin-form when clicked. It's only purpose, 
//  therefore, is to change the state in the context.


// 3. <Window> accepts the form as its child, and again, 
// it creates a copy of that child and adds the close() function to the onCloseModal prop of the clone. 
// This function is now accessible by the JSX within the form child component. 
// We specifically name this window cabin-form and we tell it not to render any JSX unless the context state matches this name.

// As such, when we click the Add new Cabin button, the context state is set to cabin-form which then causes Window to render. When we click the close buttons within Window, they set the state back to '', so Window is removed.
