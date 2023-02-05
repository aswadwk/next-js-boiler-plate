import { Select } from 'antd';
import { useState } from 'react';

interface objectOptionInterface {
    id: string,
    name: string
}

interface props {
    onChangeAccount: Function,
    options: Array<any>
}

const SelectSearch = ({onChangeAccount,options}: props) => {
  const transformedArray = options.map((obj: objectOptionInterface) => {
    return {
      value: obj.id,
      label: obj.name
    };
  });

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
    onChangeAccount(value);
  };

  return (
    <Select
      showSearch
      style={{ width: '100%' }}
      placeholder="Search to Select"
      optionFilterProp="children"
      onChange={handleChangeSelect}
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA: any, optionB: any) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={transformedArray}
    />
  )
}

export default SelectSearch