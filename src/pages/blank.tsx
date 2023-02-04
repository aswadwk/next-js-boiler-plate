import PageHeader from '@/components/Header/PageHeader'
import { Button } from 'antd'
import React from 'react'
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

const Blank = () => {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {/* <PageHeader /> */}
      </div>
      <div className="page-body">
        <div className="container-fluid">
          blank
          <Button type="primary">Button</Button>
          <DatePicker onChange={onChange} />
        </div>
      </div>
    </div>
  )
}

export default Blank