import Header from '@/components/Table/TableHeader';
import PageHeader from '@/components/Header/PageHeader';
import DeleteConfirmationModal from '@/components/Modal/DeleteConfirmationModal';
import TableFooter from '@/components/Table/TableFooter';
import accountService from '@/services/account';
import { dateForHuman } from '@/utils';
import { useEffect, useState } from 'react';
import AddAccountModal from '@/components/Modal/AddAccountModal';

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState('');
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(10);


  async function getAccounts({ page, limit, search }: any) {
    if (search === '') {
      search = null;
    }

    const result = await accountService.getAllAccount({ page, per_page: limit, name: search });

    const { data, status } = result;
    if (status) {
      setAccounts(data.data);
      setTotalPage(data.last_page ?? 0);
      setTotal(data.total ?? 0);
      setFrom(data.from ?? 0);
      setTo(data.to ?? 0);
    }

  }

  useEffect(() => {
    getAccounts({ page: currentPage, limit, search });
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
    getAccounts({ page: currentPage, limit, search });
  }

  function modalClose() {
    const modalElement = document.getElementById('modal-tipe-akun');
    const modal = window.bootstrap.Modal.getInstance(modalElement as HTMLElement);

    if (modal) {
      modal.hide();
    }
  }

  async function onSubmitAccount({ code, name, accountTypeId }: any) {
    console.log(code, name, accountTypeId);
    const { status } = await accountService.addAccount({
      code, name, accountTypeId,
    });

    if (status) {
      onProcessSuccess();
      modalClose();
    }
  }

  async function onDelete(id: any) {
    await accountService.deleteAccount(id)
      .then((result) => {
        const { status } = result;
        if (status) {
          getAccounts({ page: currentPage, limit, search });
        }
      });
  }

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <PageHeader title="Akun">
          <AddAccountModal
            onSubmit={onSubmitAccount}
            modalClose={modalClose}
          />
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
                      <th>Tipe Akun</th>
                      <th>Create By</th>
                      <th>Keterangan</th>
                      <th>Create At</th>
                      <th className="w-1 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.length === 0
                      && (
                        <tr>
                          <td colSpan={8} className="text-center">Data tidak ditemukan</td>
                        </tr>
                      )}

                    {accounts.map((account: any, index: number) =>
                      (
                        <tr key={account.id}>
                          <td>{index + 1 + (currentPage - 1) * limit}</td>
                          <td>{account.code}</td>
                          <td>{account.name}</td>
                          <td>{`${account.account_type.name}(${account.account_type.code})`}</td>
                          <td>{account.created_by?.name}</td>
                          <td>{account.description ?? '-'}</td>
                          <td>{dateForHuman(account.created_at)}</td>
                          <td>
                            <div className='d-flex justify-content-between gap-2'>
                              <DeleteConfirmationModal
                                text="Yakin akan menghapus ?"
                                description="Delete Tipe Akun"
                                onDelete={() => onDelete(account.id)}
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

export default Account;