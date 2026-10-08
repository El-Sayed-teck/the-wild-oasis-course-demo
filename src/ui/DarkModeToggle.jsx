import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"
import ButtonIcon from "./ButtonIcon"
import { useDarkMode } from "../context/DarkModeContext"

/*to make the btn to work we need the info whether the dark mode,
is activated or not in multiple places in the application.
so not just here in the toggle, but for example also in this logo,
so we'll have a different logo when we are in dark mode,
so this means we want thing to change on the screen when ever we change to dark mode,
no just the color themeselves but the entire state of the application 
needs to change, so that we can also display a different icon,
so we need state variable, and it needs to be accessibile
in the entire application becasue, againe,
we actually need that info both here,and in the logo,
and in the future me might even need it
in some other places, so we'll create a new context
where we'll store that state and provided to our entire application tree,
so it's gonna be the only global state, that we are going to manage,
be cause all other states are being hnadled in react query*/

function DarkModeToggle() {
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  )
}

export default DarkModeToggle
