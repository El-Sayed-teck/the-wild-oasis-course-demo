import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers"
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({cabin}) {

  const {isDeleting, deleteCabin} = useDeleteCabin()

  const {isCreating,createCabin} = useCreateCabin();
  const {id: cabinId, image, name, maxCapacity, regularPrice ,discount, description} = cabin
  
  // a function to handle the duplicate action
  function handleDuplicate(){
    /*in createCabin we pass in all the data(obj) that we wants,
    in an obj format, with it's poroperty similar to the original */
    createCabin({
      /*name: copy of original name */
      name: `Copy of ${name}`,
      maxCapacity, regularPrice, discount, image, description

    })
  }
  /*after this all we have to do is to hook this function to the duplicate btn */
 
  return (
      <Table.Row>
        <Img src={image} alt="" />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
        <div>

          {/*here we want to add the Modal window */}
          <Modal>
            <Menus.Menu>
             
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button icon={<HiSquare2Stack />} 
                onClick={() => handleDuplicate()}
                disabled={isCreating}
                >Duplicate</Menus.Button>
                
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
                
              </Menus.List>
            </Menus.Menu>

           
            <Modal.Window name="edit">
             
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            
            <Modal.Window name="delete">
              <ConfirmDelete resourceName='cabins'
                disabled={isDeleting} 
                onConfirm={() => deleteCabin(cabinId)}/>
            </Modal.Window>
          </Modal>       
        </div>
      </Table.Row>
    
  )  

}

export default CabinRow
