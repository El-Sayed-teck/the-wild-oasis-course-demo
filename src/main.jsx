import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ui/ErrorFallback.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*for error boundray we'tre gogga wrapp
    App.jsx into the ErrorBoundry component over it,
    in the comp we gonna specify the prop FallbackComponent,
    in it we are gonna define a component,
    */}
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      /*we can provide a callback function into the ErrorBoundry comp,
      so this we'll use a prop thye onReset prop,
      in it we'll rederect the user back to the index page */
      onReset={() => window.location.replace("/")}
      /*window.location.replace("/") is a browser JavaScript 
      command that navigates the user to /, 
      which is usually your application's root/home page. */
      /*after all of this, inside the ErrorFallback
      we get access to this onReset prop
      and use a callback function in it,
      this callback function is accessible to ErrorFallback,
       */

      /*thanks to all of this, the error has been reset,
      and the app has been reseted as well, now the users knows
      that they can use the rest of the application,
      just knows that these error boudaries really only catch errors 
      while react is rendering. so bugs that occur in some event handlers
      or in an effect or in some asunchronouse code will not be caught by error boundary
      but for those, we many times have som eother mechanisms,
      like for example, those errors that are usually returned from use query,
      but for all the bugs that might happen in rendering,
      so you should always implement error boundary*/
      >
      <App />
    </ErrorBoundary>
  </StrictMode>
)
