import React from 'react';

interface PageHeaderProps {
  children: React.ReactNode;
  title: string;
}

const PageHeader = ({ children, title }: PageHeaderProps) => {
  return (
    <div className="page-header d-print-none">
      <div className="row align-items-center">
        <div className="col">
          <div className="page-pretitle">
            Overview
          </div>
          <h2 className="page-title">
            {title}
          </h2>
        </div>
        <div className="col-auto ms-auto d-print-none">
          <div className="btn-list">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;