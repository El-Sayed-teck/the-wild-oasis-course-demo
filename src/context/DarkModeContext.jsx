import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext()

function DarkModeProvider({children}){
  //const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");
  /*here we decided that dark/light mode should match the user browser settings,
  so if the user on the browser set dark them, then the app should display dark theme,
  and this will set the dark mode default value to be the value that the user set it in their operationg system
  so to get access to that kind of info we'll use a media query,window.matchMedia("(prefers-color-scheme: dark)"),
  and check if this media query matches (.matches) */
  const [isDarkMode, setIsDarkMode] = useLocalStorageState( window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"); // from course github
    /*if its matches so we get true, now if we used window.matchMedia("(prefers-color-scheme: dark)").matches
    as a default value, then on the first time that i opened up the application,
    it would already be in dark mode  */

    
    /*now we'll need to add the classes dark-mode and light-mode to the <html> tag,
    we'll do that here in the context with an useEffect() */
    useEffect(function(){
      /*if isDarkMode is false, then we'll do some dom manipulations */
      if(isDarkMode){
        /*in the <html> which is documentElement.
        with the classList method we'll add a dark-mode class, 
        then remove light-mode class */
        document.documentElement.classList.add("dark-mode")
        document.documentElement.classList.remove("light-mode")
      }else{
        /*else we'll remove dark-mode class and add light-mode class */
        document.documentElement.classList.remove("dark-mode")
        document.documentElement.classList.add("light-mode")
      }
    }, [isDarkMode])
    
    function toggleDarkMode(){
      setIsDarkMode(isDark => !isDark)
    }

  return <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
    {children}
  </DarkModeContext.Provider>
}

function useDarkMode(){
  const context = useContext(DarkModeContext)
  if(context === undefined) 
    throw new Error("DarkModeContext was used outside of DarkModeProvider")
  return context
}

export {useDarkMode, DarkModeProvider}