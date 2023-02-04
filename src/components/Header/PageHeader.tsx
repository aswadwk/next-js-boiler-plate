import React from 'react'

const PageHeader = () => {
  return (
    <div className="page-header d-print-none">
      <div className="row align-items-center">
        <div className="col">
          <div className="page-pretitle">
                      Overview
          </div>
          <h2 className="page-title">
                      Fluid layout
          </h2>
        </div>
        <div className="col-auto ms-auto d-print-none">
          <div className="btn-list">
            <span className="d-none d-sm-inline">
              <a href="#" className="btn btn-white">
                          New view
              </a>
            </span>
            <a href="#" className="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal" data-bs-target="#modal-report">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        Create new report
            </a>
            <a href="#" className="btn btn-primary d-sm-none btn-icon" data-bs-toggle="modal" data-bs-target="#modal-report" aria-label="Create new report">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader