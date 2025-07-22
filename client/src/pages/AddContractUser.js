import React from 'react';
import ContractForm from '../components/ContractForm';

const AddContractUser = () => {
  const handleAdd = (newContract) => {
    console.log("Yangi shartnoma qo‘shildi:", newContract);
    // Kontraktlar ro‘yxatini yangilash yoki boshqa ishlar
  };

  return (
    <div className="container mt-4">
      <h2>Yangi shartnoma qo‘shish</h2>
      <ContractForm onAdd={handleAdd} />
    </div>
  );
};

export default AddContractUser;
