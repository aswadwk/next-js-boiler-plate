import React from 'react'
import { Button } from 'antd'

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
            <Button type='primary'>Create New</Button>
            <Button className="btn btn-primary d-sm-none btn-icon" type='primary'>+</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader