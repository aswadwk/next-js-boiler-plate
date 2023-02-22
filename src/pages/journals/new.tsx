import React, { useEffect, useState } from 'react';
import accountService from '@/services/account';

const AddJournal = () => {
  const [accounts, setAccounts] = useState([]);
  const [newJournal, setNewJournal] = useState([
    {
      date: '',
      account: '',
      debet: 0,
      credit: 0,
    },
    {
      date: '',
      account: '',
      debet: 0,
      credit: 0,
    },
  ]);

  async function getAccount() {
    const result = await accountService.getAllAccounts();
    const { data, status } = result;
    if (status) {
      setAccounts(data.data);
    }
  }

  useEffect(() => {
    getAccount();
  }, []);

  const addRow = () => {
    const newRow = [...newJournal];
    newRow.push({
      date: '',
      account: '',
      debet: 0,
      credit: 0,
    });

    setNewJournal(newRow);
  };

  const deleteRow = (index: number) => {
    if (newJournal.length > 2) {
      console.log(index);

      const newJournalCopy = [...newJournal];
      newJournalCopy.splice(index, 1);
      setNewJournal(newJournalCopy);
    }
  };

  const handleChangeDate = (event: any, index: number) => {
    const newDate: any = [...newJournal];
    newDate[index].date = event.target.value;
    setNewJournal(newDate);
  };

  const handleChangeAccount = (event: any, index: number) => {
    const newAccount: any = [...newJournal];
    newAccount[index].account = event.target.value;
    setNewJournal(newAccount);
  };

  const handleChangeDebet = (event: any, index: number) => {
    const reg = /^-?\d*(\.\d*)?$/;

    const newDebet: any = [...newJournal];
    if (reg.test(event.target.value)) {
      newDebet[index].debet = event.target.value;
    }

    setNewJournal(newDebet);
  };

  const handleChangeCredit = (event: any, index: number) => {
    const reg = /^-?\d*(\.\d*)?$/;

    const newCredit: any = [...newJournal];

    if (reg.test(event.target.value) || event.target.value === '' || event.target.value === '-') {
      newCredit[index].credit = event.target.value;
    }

    setNewJournal(newCredit);
  };


  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(newJournal);
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
                      <input
                        onChange={(event: any) => handleChangeDate(event, 0)}
                        className='form-control'
                        type="date" />
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
                        {newJournal.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <select className='form-select' 
                                onChange={(event: any) => handleChangeAccount(event, index)}>
                                <option value=''>Pilih Akun</option>
                                {accounts.map((account: any) => (
                                  <option key={account.id} value={account.id}>{account.name}</option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input
                                className='form-control'
                                placeholder="000"
                                accept=''
                                value={newJournal[index].debet}
                                onChange={(event: any) => handleChangeDebet(event, index)}
                              // onChange={event => setNewJournal({ ...newJournal, debet: event.target.value })}
                              />
                            </td>
                            <td>
                              <input
                                className='form-control'
                                placeholder="000"
                                value={newJournal[index].credit}
                                onChange={(event: any) => handleChangeCredit(event, index)}
                              // onChange={event => setNewJournal({ ...newJournal, credit: event.target.value })}
                              />
                            </td>
                            <td>
                              <button className='btn bt-secondary' onClick={() => deleteRow(index)}>{index}</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>
                            <button className='btn btn-seconddary' onClick={addRow}>Tambah</button>
                          </td>
                          {/* <td className='text-end'>{amountDebet}</td> */}
                          <td className='text-end'>90.000</td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="card-footer text-end">
                  <div className='d-flex gap-2 justify-content-end'>
                    <button className='btn btn-secondary'>Reset</button>
                    <button className='btn btn-primary' >Simpan</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJournal;