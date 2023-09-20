import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../Redux/slices/filterSlice";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(page) => dispatch(setCurrentPage(page.selected + 1))}
      pageRangeDisplayed={1}
      pageCount={2}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
