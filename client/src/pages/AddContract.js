import React, { useState } from 'react';
import ContractForm from '../components/ContractForm';
import ContractFormAdmin from './ContractFormAdmin';
import AddContractForm from './AddContractForm';

const AddContract = () => {
  const [contracts, setContracts] = useState([]);
  return (
    <div>
      <h2>➕ Shartnoma qo‘shishshsh</h2>
      <AddContractForm onAdd={(c) => setContracts([c, ...contracts])} />
    </div>
  );
};

export default AddContract;
