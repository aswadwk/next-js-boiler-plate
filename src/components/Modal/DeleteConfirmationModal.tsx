import React from 'react';

const DeleteConfirmationModal = ({ onDelete, text, description }: any) => {
  function modalClose() {
    const modalElement = document.getElementById('modal-tipe-akun');
    const modal = window.bootstrap.Modal.getInstance(modalElement as HTMLElement);
    
    if (modal) {
      modal.hide();
    }
  }

  function handlerDelete() {
    onDelete();
    modalClose();
  }

  return (
    <>
      <a href="#" className="btn-link text-danger" data-bs-toggle="modal" data-bs-target="#modal-small">
        Delete
      </a>
      <div className="modal modal-blur fade" id="modal-small" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="modal-title">{text}</div>
              <div>{description}</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-link link-secondary me-auto" data-bs-dismiss="modal">Cancel</button>
              <button 
                onClick={handlerDelete}
                type="button" 
                className="btn btn-danger" data-bs-dismiss="modal">Yes, Delete!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;