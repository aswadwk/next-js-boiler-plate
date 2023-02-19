import React from 'react';
import useInput from '@/hooks/useInput';


interface AccountTypeFormProps {
    onSubmit: (values: any) => void;
    onClose: () => void;
}

const AccountTypeForm = ({ onSubmit, onClose }: AccountTypeFormProps) => {
  const [name, setName] = useInput('');
  const [code, setCode] = useInput('');
  const [positionNormal, setPositionNormal] = useInput('');
  // const [description, setDescription] = useInput('');

  function handleSubmit(event: any) {
    event.preventDefault();

    // TODO: tambah description
    onSubmit({ name, code, positionNormal });
  }


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
            onChange={setPositionNormal}
            value={positionNormal} 
            className="form-select" placeholder="Pilih posisi normal">
            <option value="">Pilih Posisi Normal</option>
            <option value="D">Debet</option>
            <option value="C">Kredit</option>
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

export default AccountTypeForm;