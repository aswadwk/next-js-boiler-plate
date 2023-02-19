import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import AccountTypeInput from '../Form/AccountTypeInput';

const AccountTypeModal = ({ type, onProcessSuccess }: any): any => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalType, setModalType] = useState(type);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {modalType === 'accountType' ? 'Create New' : 'Create New'}
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <AccountTypeInput onProcessSuccess={onProcessSuccess} onOk={handleOk} />
      </Modal>
    </>
  );
};

export default AccountTypeModal;