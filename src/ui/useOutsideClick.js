import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true){
    // a ref to select styledModal
    const ref = useRef()
    /*here we'll do some primitive dom manipulation,
    so we'll use useEffect */
    useEffect(function(){
      function handleClick(e){
        /*ref element exist and it doesn't contain e.target(the element where the click doesnìt happen),
        so if the click happens on one of these elements inside the modal,
        then that of course is inside the modal, so !ref.current.contain(e.target) becomes false
        and then nothing happens, but if a click happens outside, then this is no longer contained here in the ref,
        and so this close() function should get called*/
        if(ref.current && !ref.current.contains(e.target)){
         // console.log('it clicked')
          handler();
          }
        }
  
        /*we don't have to listen to thsi event in teh bubling phase,
        but on teh capturing phase, basically as the event moves down the DOM tree,
        and not up teh the DOM tree, we can change this behavior passing in a third argument,
        which is to simpley to set this to true, and with this the event will be handled in teh capturing phase,
        so as the event moves down the tree, this just */
        document.addEventListener('click', handleClick, listenCapturing);     
        // let's return a callback function, to remove the eventListener
        return () => document.removeEventListener('click', handleClick, listenCapturing)
    }, [handler, listenCapturing])

    return {ref}
}