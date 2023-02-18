import React, { useState } from 'react'

const TableHeader = ({ onSearch, onItemPerPage }: any) => {
  const [search, setSearch] = useState('')
  const [itemPerPage, setItemPerPage] = useState(10)

  function setSearchValue(e: any) {
    setSearch(e.target.value)
    onSearch(e.target.value)
  }

  function setItemPerPageValue(e: any) {
    setItemPerPage(e.target.value)
    onItemPerPage(e.target.value)
  }

  return (
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
              value={itemPerPage}
              onChange={(e) => setItemPerPageValue(e)}
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
  )
}

export default TableHeader