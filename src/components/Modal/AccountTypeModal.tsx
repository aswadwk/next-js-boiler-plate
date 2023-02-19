import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import AccountTypeInput from '../Form/AccountTypeInput';

const AccountTypeModal = ({ onProcessSuccess }: any): any => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        Create New
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <AccountTypeInput onProcessSuccess={onProcessSuccess} onOk={handleOk} />
      </Modal>
    </>
  );
};

export default AccountTypeModal;