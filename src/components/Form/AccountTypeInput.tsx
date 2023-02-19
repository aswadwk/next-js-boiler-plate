import { Button, Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React from 'react';

const { Option } = Select;

const AccountTypeInput = ({ onProcessSuccess, onSubmitAccountType }: any) => {
  const formRef = React.useRef<FormInstance>(null);

  const onReset = () => {
    formRef.current?.resetFields();
  };

  console.log(onProcessSuccess);
  async function handleSubmitAccountType(values: any) {

    onSubmitAccountType(values);
    onReset();
  }
  
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      ref={formRef}
      onFinish={handleSubmitAccountType}
      layout="vertical"
    >
      <Form.Item name="name" label="Nama Tipe Akun" required tooltip="Wajib di isi">
        <Input placeholder="Nama tipe akun" />
      </Form.Item>
      <Form.Item
        name="code"
        label="Kode Tipe Akun"
      >
        <Input required placeholder="Kode tipe akun" />
      </Form.Item>
      <Form.Item
        name="positionNormal"
        label="Position Normal"
      >
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          <Option value="D">Debet</Option>
          <Option value="C">Kredit</Option>
        </Select>
      </Form.Item>


      <Form.Item>
        <Button
          htmlType='submit' 
          type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default AccountTypeInput;