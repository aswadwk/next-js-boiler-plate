import React, { useEffect, useState } from 'react';
import useInput from '@/hooks/useInput';
import accountTypeService from '@/services/accounType';


interface AccountTypeFormProps {
  onSubmit: (values: any) => void;
  onClose: () => void;
}

const AddAccountForm = ({ onSubmit, onClose }: AccountTypeFormProps) => {
  const [accountTypes, setAccountTypes] = useState<any[]>([]);
  const [name, setName] = useInput('');
  const [code, setCode] = useInput('');
  const [accountType, setAccountType] = useInput('');
  // const [description, setDescription] = useInput('');

  function handleSubmit(event: any) {
    event.preventDefault();

    // TODO: tambah description
    onSubmit({ name, code, accountTypeId: accountType });
  }

  async function getAccountTypes() {
    const result = await accountTypeService.getAllAccountTypeWithoutPaginate();

    const { data, status } = result;
    if (status) {
      setAccountTypes(data);
    }
    // setAccountTypes(result);
  }

  useEffect(() => {
    getAccountTypes();

  }, []);


  return (
    <div className="col">
      <form
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label className="form-label">Nama Akun</label>
          <input
            onChange={setName}
            value={name}
            type="text" className="form-control" placeholder="Nama" />
        </div>
        <div className="mb-3">
          <label className="form-label">Kode Akun</label>
          <input
            onChange={setCode}
            value={code}
            type="text" className="form-control" placeholder="Kode" />
        </div>
        <div className="mb-3">
          <label className="form-label">Posisi Normal</label>
          <select
            onChange={setAccountType}
            value={accountType}
            className="form-select" placeholder="Pilih posisi normal">

            <option value="">Pilih Tipe Akun</option>
            {accountTypes.map((accountType) => (
              <option key={accountType.id} value={accountType.id}>{`${accountType.name}(${accountType.code})`}</option>
            ))}
          </select>
        </div>
        <div className="text-end">
          <div className="d-flex">
            <button
              onClick={onClose}
              className="btn btn-link">Cancel</button>
            <button type="submit" className="btn btn-primary ms-auto">Simpan</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAccountForm;