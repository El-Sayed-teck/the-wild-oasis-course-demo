import { useSearchParams } from "react-router-dom"
import Select from "./Select"

function SortBy({options}) {
  /*for the options array,
  we want a select element for each element of the array,
  so let's build a resudable one, it's Select.jsx */

  // set the value to the state in the url
  const [searchParams, setSearchParams] = useSearchParams();
  // let's get the current selected value, 
  // so that we can it then the selected one when we refresh the page
  /*so when we refresh the page the selected value will be the default value,
  that's what we did in the filter with searchParams.get("discount")*/
  const sortBy = searchParams.get("sortBy") || "";
  
  const page = searchParams.get("page"); // fix from the coments
  /*here we want a way of handling that a element has been clicked,
  so we'll create our function for that,
  here we select the event e 
  ,and use it to set that value that we receive there to the state again
  to the state in the url */
  function handleChange(e){
    // if (page) searchParams.delete("page") // fix from the coments
    searchParams.set("sortBy", e.target.value)
    setSearchParams(searchParams);
  }

  return (
    <Select options={options} type="white" 
    //test="jonas" // test è un prop di prova
    value={sortBy}
    onChange={handleChange}/> 
  )
}

export default SortBy

