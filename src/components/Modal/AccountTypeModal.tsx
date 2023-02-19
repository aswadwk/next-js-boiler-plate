import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import AccountTypeInput from '../Form/AccountTypeInput';
import accountType from '@/services/accounType';

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

  async function onSubmitAccountType(values: any) {
    console.log('Received values of form: ', values);
    const result = await accountType.addAccountType({
      code: values.code, name: values.name, positionNormal: values.positionNormal,
    });

    // get account types
    onProcessSuccess();
    handleOk();
    console.log(result);
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create New
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
        <AccountTypeInput 
          onSubmitAccountType={onSubmitAccountType}
          onProcessSuccess={onProcessSuccess} 
          onOk={handleOk} />
      </Modal>
    </>
  );
};

export default AccountTypeModal;