import React from 'react';

const PageHeader = (props: any) => {
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
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;