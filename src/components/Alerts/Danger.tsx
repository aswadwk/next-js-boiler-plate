import React from 'react';

interface DangerInterface {
    title: string;
    message: string;
}

const Danger = ({ title, message }: DangerInterface) => {
  return (
    <div className="alert alert-danger alert-dismissible" role="alert">
      <div className="d-flex">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 8l0 4" /><path d="M12 16l.01 0" /></svg>
        </div>
        <div>
          <h4 className="alert-title">{title}&hellip;</h4>
          <div className="text-muted">{message}</div>
        </div>
      </div>
      <a className="btn-close" data-bs-dismiss="alert" aria-label="close"></a>
    </div>
  );
};

export default Danger;