import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useSelector } from "react-redux";

const Pagination = ({ currentPage, onChangePage }) => {
  const { category } = useSelector(state => state.filter);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={event => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={category ? 1 : 3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
