//import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
//import { getCabins } from "../services/apicabins";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        {/*here we'll place the comp CabinTableOperations.jsx,
        for filter/sort logic */}
        <CabinTableOperations />
      </Row>


      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
