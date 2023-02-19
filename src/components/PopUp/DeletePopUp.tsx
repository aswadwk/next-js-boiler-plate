import React, { useState } from 'react';
import { Popconfirm } from 'antd';

const DeletePopUp = ({ text, description, onDelete }: any) => {

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    onDelete();
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };


  return (
    <Popconfirm
      title={text}
      description={description}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <a
        href="#"
        className='text-danger'
        onClick={showPopconfirm}>Delete</a>
    </Popconfirm>
  );
};

export default DeletePopUp;