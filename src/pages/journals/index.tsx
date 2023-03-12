import PageHeader from '@/components/Header/PageHeader';
import AddAccountModal from '@/components/Modal/AddAccountModal';
// import DeleteConfirmationModal from '@/components/Modal/DeleteConfirmationModal';
import TableFooter from '@/components/Table/TableFooter';
import TableHeader from '@/components/Table/TableHeader';
import accountService from '@/services/account';
import journalService from '@/services/journal';
import { dateFormatIndonesia } from '@/utils';
import React, { useEffect, useState } from 'react';

const Journal = () => {
  const [journals, setJournals] = useState([]);
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

    const result = await journalService.getAll({ page, per_page: limit, name: search });

    const { data, status } = result;
    if (status) {
      setJournals(data.data);
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

  // async function onDelete(id: any) {
  //   await accountService.deleteAccount(id)
  //     .then((result) => {
  //       const { status } = result;
  //       if (status) {
  //         getAccounts({ page: currentPage, limit, search });
  //       }
  //     });
  // }

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <PageHeader title="Daftar Journal">
          <AddAccountModal
            onSubmit={onSubmitAccount}
            modalClose={modalClose}
          />
        </PageHeader>
        <div className="page-body">
          <div className="col-12">
            <div className="card">
              <TableHeader onItemPerPage={onChangeLimit} onSearch={onSearch} />
            </div>
            <div className="table-responsive">
              <table
                className="table table-vcenter card-table table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kode Akun</th>
                    <th>Tanggal</th>
                    <th>Keterangan</th>
                    <th>Mitra</th>
                    <th>Ak Debet</th>
                    <th>Ak Kredit</th>
                    <th colSpan={2} className="w-1 text-center">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {journals.length === 0
                      && (
                        <tr>
                          <td colSpan={8} className="text-center">Data tidak ditemukan</td>
                        </tr>
                      )}

                  {journals.map((journal: any, index: number) =>
                    (
                      <tr key={journal.id}>
                        <td>{index + 1 + (currentPage - 1) * limit}</td>
                        <td>{journal.account?.code}</td>
                        <td>{dateFormatIndonesia(journal.created_at)}</td>
                        <td>{journal.description}</td>
                        <td>{journal.partner?.name}</td>
                        <td>{journal.type === 'C' ? journal.account?.name : '' }</td>
                        <td>{journal.type === 'D' ? journal.account?.name : '' }</td>
                        <td className='text-end'>{journal.type === 'C' ? journal.amount : '' }</td>
                        <td className='text-end'>{journal.type === 'D' ? journal.amount : '' }</td>
                      </tr>
                    ),
                  )
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={7} className="text-center">Total</td>
                    <td className="text-end">{journals.reduce((a: any, b: any) => a + (b.type === 'C' ? b.amount : 0), 0)}</td>
                    <td className="text-end">{journals.reduce((a: any, b: any) => a + (b.type === 'D' ? b.amount : 0), 0)}</td>
                  </tr>
                </tfoot>
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
  );
};

export default Journal;