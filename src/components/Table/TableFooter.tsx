import ReactPaginate from 'react-paginate';

const TableFooter = ({ from, to, total, totalPage, changePage }: any) => {

  function setChangePageValue({ selected }: any) {
    changePage(selected + 1);
  }

  return (
    <div className="card-footer d-flex align-items-center">
      <p className="m-0 text-muted">Showing <span>{from}</span> to <span>{to}</span> of <span>{total}</span> entries</p>
      <ReactPaginate
        previousLabel={'< prev'}
        nextLabel={'next >'}
        breakLabel={'...'}
        pageCount={totalPage}
        onPageChange={setChangePageValue}
        containerClassName={'pagination m-0 ms-auto'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        activeClassName={'active'}
        previousClassName={'page-item'}
        nextClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        disabledLinkClassName={'disabled'}
      />
    </div>
  );
};

export default TableFooter;