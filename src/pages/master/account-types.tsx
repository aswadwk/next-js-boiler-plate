import PageHeader from '@/components/Header/PageHeader'
import { asyncReceiveAccountTypes } from '@/states/accountTypes/action'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import apiHelper from '@/utils/api';
import Header from '@/components/Table/Header'
import Footer from '@/components/Table/Footer'
import ReactPaginate from 'react-paginate'

const AccountType = () => {
  const [accountTypes, setAccountTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [search, setSearch] = useState('')
  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(10)

  useEffect(() => {
    getAccountTypes({ page: currentPage, limit, search})
    console.log(search);
  }, [search, currentPage, page, limit])


  async function getAccountTypes({ page, limit, search} : any) {
    if(search === '') {
      search = null
    }

    const result = await apiHelper.getAllAccountTypesWithPagination({ page, per_page: limit, name: search});

    const { data, status } = result;
    if(status){
      setAccountTypes(data.data);
      setTotalPage(data.last_page);
      setTotal(data.total);
      setFrom(data.from);
      setTo(data.to);      
    }

  }

  function changePage({ selected }: any) {
    setCurrentPage(selected + 1)
    console.log(selected)
  }

  function setSearchValue(e: any) {
    setSearch(e.target.value)
    setCurrentPage(1)
    setPage(1)
  }

  function changeLimit(e: any) {
    setLimit(e.target.value)
    setCurrentPage(1)
    setPage(1)
  }



  if (accountTypes.length === 0) {
    return null
  }


  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <PageHeader />
        <div className="page-body">
          <div className="container-fluid">
            <div className="col-12 col-md-8">
              <div className="card">
                {/* <Header /> */}
                <div className="card-body border-bottom py-3">
                  <div className="d-flex">
                    <div className="text-muted">
                      Show
                      <div className="mx-2 d-inline-block">
                        <input 
                          type="text" 
                          className="form-control form-control-sm" 
                          size={3} 
                          aria-label="Invoices count" 
                          value={limit}
                          onChange={(e) => changeLimit(e)}
                        />
                      </div>
                      entries
                    </div>
                    <div className="ms-auto text-muted">
                      Search:
                      <div className="ms-2 d-inline-block">
                        <input 
                          type="text" 
                          className="form-control form-control-sm" 
                          aria-label="Search invoice" 
                          value={search}
                          onChange={(e) => setSearchValue(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table
                  className="table table-vcenter card-table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode</th>
                      <th>Nama</th>
                      <th>Posisi Normal</th>
                      <th>Create By</th>
                      <th>Keterangan</th>
                      <th>Create At</th>
                      <th className="w-1 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountTypes.map((accountType: any, index: number) => (
                      <tr key={accountType.id}>
                        <td>{index + 1 + (currentPage - 1) * limit}</td>
                        <td>{accountType.code}</td>
                        <td>{accountType.name}</td>
                        <td>{accountType.position_normal}</td>
                        <td>{accountType.created_by?.name}</td>
                        <td>{accountType.description}</td>
                        <td>{accountType.description}</td>
                        <td>
                          <div className='d-flex justify-content-between gap-2'>
                            <a className='text-danger' href="#">Delete</a>
                            <a href="#">Edit</a>
                          </div>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
              {/* <Footer /> */}

              <div className="card-footer d-flex align-items-center">
                <p className="m-0 text-muted">Showing <span>{from}</span> to <span>{to}</span> of <span>{total}</span> entries</p>
                <ReactPaginate
                  previousLabel={'< prev'}
                  nextLabel={'next >'}
                  breakLabel={'...'}
                  pageCount={totalPage}
                  onPageChange={changePage}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountType