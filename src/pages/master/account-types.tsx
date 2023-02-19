import PageHeader from '@/components/Header/PageHeader';
import React, { useEffect, useState } from 'react';
import apiHelper from '@/utils/api';
import Header from '@/components/Table/TableHeader';
import TableFooter from '@/components/Table/TableFooter';
import accountType from '@/services/accounType';
import AccountTypeModalNew from '@/components/Modal/AccountTypeModalNew';
import DeleteConfirmationModal from '@/components/Modal/DeleteConfirmationModal';

const AccountType = () => {
  const [accountTypes, setAccountTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState('');
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(10);


  async function getAccountTypes({ page, limit, search }: any) {
    if (search === '') {
      search = null;
    }

    const result = await apiHelper.getAllAccountTypesWithPagination({ page, per_page: limit, name: search });

    const { data, status } = result;
    if (status) {
      setAccountTypes(data.data);
      setTotalPage(data.last_page ?? 0);
      setTotal(data.total ?? 0);
      setFrom(data.from ?? 0);
      setTo(data.to ?? 0);
    }

  }

  useEffect(() => {
    getAccountTypes({ page: currentPage, limit, search });
  }, [search, currentPage, page, limit]);

  function onChangePage(e: any) {
    setCurrentPage(e);
  }

  function onSearch(q: any) {
    setSearch(q);
    setCurrentPage(1);
    setPage(1);
  }

  function onChangeLimit(e: any) {
    setLimit(e);
    setCurrentPage(1);
    setPage(1);
  }

  function onProcessSuccess() {
    getAccountTypes({ page: currentPage, limit, search });
  }

  async function onDelete(id: any) {
    await accountType.deleteAccountType(id)
      .then((result) => {
        const { status } = result;
        if (status) {
          getAccountTypes({ page: currentPage, limit, search });
        }
      });
  }

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <PageHeader title="Account Type">
          <AccountTypeModalNew onProcessSuccess={onProcessSuccess} />
        </PageHeader>
        <div className="page-body">
          <div className="container-fluid">
            <div className="col-12 col-md-8">
              <div className="card">
                <Header onItemPerPage={onChangeLimit} onSearch={onSearch} />
              </div>
              <div className="table-responsive">
                <table
                  className="table table-vcenter card-table table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode</th>
                      <th>Nama</th>
                      <th>Posisi Normal</th>
                      <th>Create By</th>
                      <th>Keterangan</th>
                      <th>Create At</th>
                      <th className="w-1 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountTypes.length === 0 &&
                      (
                        <tr>
                          <td colSpan={8} className="text-center">Data tidak ditemukan</td>
                        </tr>
                      )
                    }

                    {accountTypes.map((accountType: any, index: number) =>
                      (
                        <tr key={accountType.id}>
                          <td>{index + 1 + (currentPage - 1) * limit}</td>
                          <td>{accountType.code}</td>
                          <td>{accountType.name}</td>
                          <td>{accountType.position_normal}</td>
                          <td>{accountType.created_by?.name}</td>
                          <td>{accountType.description}</td>
                          <td>{accountType.description}</td>
                          <td>
                            <div className='d-flex justify-content-between gap-2'>
                              {/* <DeletePopUp
                                text="Yakin akan menghapus ?"
                                description="Delete Tipe Akun"
                                onDelete={() => onDelete(accountType.id)} /> */}
                              <DeleteConfirmationModal 
                                text="Yakin akan menghapus ?"
                                description="Delete Tipe Akun"
                                onDelete={() => onDelete(accountType.id)}
                              />
                              <a href="#">Edit</a>
                            </div>
                          </td>
                        </tr>
                      ),
                    )
                    }
                  </tbody>
                </table>
              </div>
              <TableFooter
                from={from}
                to={to}
                total={total}
                totalPage={totalPage}
                changePage={onChangePage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountType;