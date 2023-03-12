import React, { useEffect, useState } from 'react';
import accountService from '@/services/account';
import journalService from '@/services/journal';

const AddJournal = () => {
  const [accounts, setAccounts] = useState([]);
  const [amountDebet, setAmountDebet] = useState(0);
  const [amountCredit, setAmountCredit] = useState(0);
  const [description, setDescription] = useState('');
  const [newJournal, setNewJournal] = useState([
    {
      date: '',
      account_id: '',
      debet: 0,
      credit: 0,
      amount: 0,
    },
    {
      date: '',
      account_id: '',
      debet: 0,
      credit: 0,
      amount: 0,
    },
  ]);

  async function addJournal(journals: any) {
    const result = await journalService.add(journals);

    const { data, status } = result;
    if (status) {
      console.log(data);
    }
  }

  async function getAccount() {
    const result = await accountService.getAllAccountWithoutPaginate();

    const { data, status } = result;
    if (status) {
      setAccounts(data);
    }
  }

  useEffect(() => {
    getAccount();
  }, []);

  const addRow = () => {
    const newRow = [...newJournal];
    newRow.push({
      date: newJournal[0].date,
      account_id: '',
      debet: 0,
      credit: 0,
      amount: 0,
    });

    setNewJournal(newRow);
  };

  const deleteRow = (index: number) => {
    if (newJournal.length > 2) {
      console.log(index);

      const newJournalCopy = [...newJournal];
      newJournalCopy.splice(index, 1);
      setNewJournal(newJournalCopy);

      const debet = newJournal.map((row: any) => {
        return row.debet;
      });

      const totalDebet = debet.reduce((a: any, b: any) => {
        return Number(a) + Number(b);
      });

      setAmountDebet(totalDebet);

      const credit = newJournal.map((row: any) => {

        return row.credit;
      });

      const totalCredit = credit.reduce((a: any, b: any) => {
        return Number(a) + Number(b);
      });

      setAmountCredit(totalCredit);
    }
  };

  const handleChangeDate = (event: any, index: number) => {
    const newDate: any = [...newJournal];
    newDate[index].date = event.target.value;
    setNewJournal(newDate);
  };

  const handleChangeAccount = (event: any, index: number) => {
    const newAccount: any = [...newJournal];
    newAccount[index].account_id = event.target.value;
    setNewJournal(newAccount);
  };

  const handleChangeDebet = (event: any, index: number) => {
    const reg = /^-?\d*(\.\d*)?$/;

    const newDebet: any = [...newJournal];

    if (reg.test(event.target.value) || event.target.value === '' || event.target.value === '-') {
      newDebet[index].debet = event.target.value;
      newDebet[index].credit = 0;
      newDebet[index].type = 'D';
      newDebet[index].amount = event.target.value;
    }

    setNewJournal(newDebet);

    const debet = newJournal.map((row: any) => {
      return row.debet;
    });

    const totalDebet = debet.reduce((a: any, b: any) => {
      return Number(a) + Number(b);
    }, 0);

    setAmountDebet(totalDebet);
  };

  const handleChangeCredit = (event: any, index: number) => {
    const reg = /^-?\d*(\.\d*)?$/;

    const newCredit: any = [...newJournal];

    if (reg.test(event.target.value) || event.target.value === '' || event.target.value === '-') {
      newCredit[index].credit = event.target.value;
      newCredit[index].debet = 0;
      newCredit[index].type = 'C';
      newCredit[index].amount = event.target.value;
    }

    setNewJournal(newCredit);

    const credit = newJournal.map((row: any) => {
      return row.credit;
    });

    const totalCredit = credit.reduce((a: any, b: any) => {
      return Number(a) + Number(b);
    }, 0);

    setAmountCredit(totalCredit);
  };

  function handleChangeDescription(event: any) {
    setDescription(event.target.value);
  }


  function handleSubmit(event: any) {
    event.preventDefault();

    //update date newJournal
    const newJournalCopy = [...newJournal];
    newJournalCopy.map((row: any) => {
      row.date = newJournal[0].date;
      row.description = description;
    });

    addJournal(newJournalCopy);
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
                  <h3 className="card-title">Form Tambah Jurnal</h3>
                </div>
                <div className="card-body">

                  <div className="row row-cards">
                    <div className="mb-3 col-sm-4 col-md-2">
                      <label className="form-label required">Tanggal</label>
                      <input
                        onChange={(event: any) => handleChangeDate(event, 0)}
                        className='form-control'
                        required
                        type="date" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Keterangan</label>
                    <textarea
                      placeholder='Masukkan keterangan' 
                      className="form-control" rows={2} onChange={(event: any) => handleChangeDescription(event)}>
                      {description}
                    </textarea>
                  </div>

                  {/* <div className="form-label">Assertions</div> */}
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
                                required
                                onChange={(event: any) => handleChangeAccount(event, index)}>
                                <option value=''>Pilih Akun</option>
                                {accounts.map((account: any) => (
                                  <option key={account.id} value={account.id}>{account.name}</option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input
                                className='form-control text-end'
                                placeholder="000"
                                accept='number'
                                value={newJournal[index].debet}
                                onChange={(event: any) => handleChangeDebet(event, index)}
                              // onChange={event => setNewJournal({ ...newJournal, debet: event.target.value })}
                              />
                            </td>
                            <td>
                              <input
                                className='form-control text-end'
                                placeholder="000"
                                value={newJournal[index].credit}
                                onChange={(event: any) => handleChangeCredit(event, index)}
                              // onChange={event => setNewJournal({ ...newJournal, credit: event.target.value })}
                              />
                            </td>
                            <td>
                              <button className='btn btn-outline-secondary' onClick={() => deleteRow(index)}>
                                -
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>
                            <button className='btn btn-outline-primary' onClick={addRow}>Tambah</button>
                          </td>
                          <td className='text-end me-12'>{amountDebet}</td>
                          <td className='text-end me-2'>{amountCredit}</td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="card-footer text-end">
                  <div className='d-flex gap-2 justify-content-end'>
                    <button className='btn btn-secondary'>Reset</button>
                    {
                      amountDebet === amountCredit ? (
                        <button className='btn btn-primary' type='submit'>Simpan</button>
                      ) : (
                        <button className='btn btn-primary' disabled>Simpan</button>
                      )
                    }
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