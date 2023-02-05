import React, { useEffect, useState } from 'react'
import { MinusOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import type { DatePickerProps } from 'antd';
import { DatePicker, Input, Button, Form, Space } from 'antd';
import SelectSearch from '@/components/Elements/Select';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { asyncAddAccount, asyncReceiveAccounts } from '@/states/accounts/action';
import { useRouter } from 'next/router';
import { asyncIsPreloadProcess } from '@/states/isPreload/action';

const AddJournal = () => {
  const router = useRouter()

  const {
    authUser= null,
    isPreload = false,
    accountsState = []
  }: any = useSelector((states) => states)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncIsPreloadProcess());
  }, [dispatch]);

  useEffect(() => {
    dispatch(asyncReceiveAccounts())
  }, [dispatch])
  
  const [rows, setRows] = useState([
    0, 1
  ]);
  const [dateJournal, setDateJournal] = useState('')
  const [account, setAccount] = useState([]);
  const [debet, setDebet] = useState([,])
  const [credit, setCredit] = useState([0,0])
  const [amountDebet, setAmountDebet]= useState(0)

  const handleChangeDebet = (event: any, index: number) => {
    const reg = /^-?\d*(\.\d*)?$/;

    const newDebet: any = [...debet];
    if (reg.test(event.target.value)) {
      newDebet[index] = event.target.value;
    }
    let amountC = 0;
    newDebet.map((x: any)=>{
      amountC += parseInt(x)
    })
    setAmountDebet(amountC)
    setDebet(newDebet);
  };

  const handleChangeCredit = (event: any, index: number) => {
    const reg = /^-?\d*(\.\d*)?$/;
    
    const newCredit: any = [...credit];
    if (reg.test(event.target.value) || event.target.value === '' || event.target.value === '-') {
      newCredit[index] = event.target.value;
    }
    setCredit(newCredit);
  };

  const addRow = () => {
    setRows([...rows, Math.max(...rows) + 1]);
  };

  const deleteRow = (index: number) => {
    if (rows.length > 2) {
      setAccount(account.filter((row, i) => i !== index))
      setCredit(credit.filter((row, i) => i !== index))
      setDebet(debet.filter((row, i) => i !== index))
      setRows(rows.filter((row, i) => i !== index))
    }
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setDateJournal(dateString)
  };

  const handleAccountChange = (value: any, index: number) => {
    const newAccount: any = [...account];
    newAccount[index] = value;
    setAccount(newAccount);
    if(Math.max(...rows)===index){
      addRow()
    }
  };


  function handleSubmit(event: any) {
    event.preventDefault()
    console.log(debet)
    console.log(credit)
    console.log(dateJournal)
    console.log(account)
  }


  if (isPreload) {
    return null;
  }

  if(!isPreload && authUser===null){
    router.push('/auth/signin')
  }



  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {/* <PageHeader /> */}
      </div>
      <div className="page-body">
        <div className="container-fluid">
          <div className="col-12">
            <div className="card">
              <form onSubmit={handleSubmit}>
                <div className="card-header">
                  <h3 className="card-title">Form Jurnal</h3>
                </div>
                <div className="card-body">

                  <div className="row row-cards">
                    <div className="mb-3 col-sm-4 col-md-2">
                      <label className="form-label required">Tanggal</label>
                      <DatePicker 
                        onChange={onChange} />
                    </div>
                  </div>
                  <div className="form-label">Assertions</div>
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th>Akun</th>
                          <th>Debet</th>
                          <th>Kredit</th>
                          <th className='w-1'>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <SelectSearch
                                onChangeAccount={(event: any) => handleAccountChange(event, index)}
                                options={accountsState}/>
                            </td>
                            <td>
                              <Input 
                                placeholder="000" 
                                accept=''
                                value={debet[index]} 
                                onChange={event => handleChangeDebet(event, index)}
                              />
                            </td>
                            <td>
                              <Input 
                                placeholder="000" 
                                value={credit[index]} 
                                onChange={event => handleChangeCredit(event, index)}
                              />
                            </td>
                            <td>
                              <Button icon={<MinusOutlined />} onClick={() => deleteRow(index)}>{index}</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>
                            <Button type="dashed" onClick={addRow}>Tambah</Button>
                          </td>
                          <td className='text-end'>{amountDebet}</td>
                          <td className='text-end'>90.000</td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="card-footer text-end">
                  <div className='d-flex gap-2 justify-content-end'>
                    <Button type="dashed">Reset</Button>
                    <Button type="primary" htmlType='submit'>Simpan</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddJournal