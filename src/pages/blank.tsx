import PageHeader from '@/components/Header/PageHeader'
import React from 'react'

const Blank = () => {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <PageHeader />
      </div>
      <div className="page-body">
        <div className="container-fluid">
          blank
        </div>
      </div>
    </div>
  )
}

export default Blank