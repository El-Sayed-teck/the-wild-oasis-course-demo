import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
  
  `;
  
// the magic number to help calculate the pageCount
//const PAGE_SIZE = 10 // be cause we need it in Pagination.jsx and apiBooking
//  we'll make a global constanse file for it, in utils folder

function Pagination({count}) {
  /*the first thing this pagination need to get is the number of results,
    so we'll accept them as props */

  // 1. to get the current page from the url we'll use useSearchParams   
  const [searchParams, setSearchParams] = useSearchParams();
   const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page")) /*if there is no "page" in the url,


  /* 2. after getting the currentPage
  when we need to implement a pagination, 
  we also need to know the number of pages, 
  we'll use the count prop to calculate it,
  using the .ceil() to round up,
  we'll devide the actual count dividing by the page size,
  so by how many results will fit on one page. we'll set it to 10,
  but it's magic number, meaning it's that someone reading this code
  will not understand where it is coming from, so 
  whenever we have a magic number it's good to place it in a variable outside the component*/
  const pageCount = Math.ceil(count / PAGE_SIZE)

  /*for each btn we'll create an event handler,
  now calculating teh prev and the next page will
  always depends on the current page,
  that current page, we want as always to get from the url,
  so we'll use searchParams*/  
  function nextPage(){
    /*to calculate the next page, 
    we check if we are in the last page,
    so if currentPage is the lastPage so pageCount,
    if true the next page will be the currentPage,
    so we don't move up to another page, otherwise will create a bug,
    in the opposite case, so currentPage is not the last page, we can increase currentpage by 1 */
    const next = currentPage === pageCount ? currentPage : currentPage + 1

    // then we do searchParam.set() to store the result in the url with domine "page",
    // and set the current state of searchParams with set function to the nextPage
    searchParams.set("page", next),
    setSearchParams(searchParams)
  }
  function prevPage(){
    /*here we do the opposite,
     in previous page we ask if the current page is the first one 1,
     if it's true the new page should become the current one, so we don't to move on,
     else if it's false, we can go one down, so moving back by one page */
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    // then we set the url for this prevPage
    searchParams.set("page", prev),
    setSearchParams(searchParams)
  }

  /* so if the results are less or equal to 1, then there is no need to display
  the pagination componenet with it's btns,
  so if count prop is equal to 5 so pageCount is <=1 then there is no need for tha Pagination.jsx*/
  if(pageCount <= 1) return null

  return (
    <StyledPagination>
      <p>
        {/*here we'll show the numebr of pages that we are in,
        and then store that page in the url */}
        {/*the beging of the current page is (curpage -1) * PAGE_SIZE + 1
        the -1 to make the pagination start with teh first result,
        it's a standrt implentation of any pagination */}
        Showing <span>{(currentPage -1) * PAGE_SIZE + 1}</span> to{" "} 
        {/*here is the currentpage is the last page, 
        we want to show the count, otherwise waht we had previusly */}
        <span>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span>
         of <span>{count}</span> results
      </p>
      {/*some btn to back and forth in the pagination */}
      <Buttons>
        <PaginationButton onClick={prevPage} 
          disabled={currentPage === 1}>
          <HiChevronLeft/> <span>Previous</span>
        </PaginationButton>

        <PaginationButton onClick={nextPage} 
        /*disable the btn if the current page is equal to the last one,
        because we can't go farther away from the last page */
          disabled={currentPage === pageCount}>
          <HiChevronRight/> <span>Next</span>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  )
}

export default Pagination
