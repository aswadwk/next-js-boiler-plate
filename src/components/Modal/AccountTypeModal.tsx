import accountType from '@/services/accounType';
import React from 'react';
import AccountTypeForm from '../Form/AccountTypeForm';

interface AccountTypeModalProps {
    title: string;
    type: string;
    modalTitle: string;
    onProcessSuccess: () => void;
}

const AccountTypeModal = ({ title, type, modalTitle, onProcessSuccess }: AccountTypeModalProps) => {

  function modalClose() {
    const modalElement = document.getElementById('modal-tipe-akun');
    const modal = window.bootstrap.Modal.getInstance(modalElement as HTMLElement);
    
    if (modal) {
      modal.hide();
    }
  }

  async function onSubmitAccountType({ code, name, positionNormal }: any) {
    const { status } = await accountType.addAccountType({
      code, name, positionNormal,
    });

    if (status) {
      onProcessSuccess();
      modalClose();
    }
  }

  return (
    <>
      <a href="#" className={ type === 'link' ? 'link' : 'btn btn-primary'} data-bs-toggle="modal" data-bs-target="#modal-tipe-akun">
        {title}
      </a>
      <div className="modal modal-blur fade" id="modal-tipe-akun" tabIndex={-1} role="dialog" aria-hidden="true">  
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <AccountTypeForm onSubmit={onSubmitAccountType} onClose={modalClose}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountTypeModal;