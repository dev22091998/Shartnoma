import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContractTable from '../components/ContractTable';
import { getContracts } from '../api/contractApi';
import SearchBar from '../components/SearchBar';
import SearchBarWithButton from '../components/SearchBarWithButton';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';


const Home = () => {
  const { userName, userRole } = useAuth();
  const [contracts, setContracts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await getContracts();
        setContracts(data);
      } catch (err) {
        console.error('Maʼlumotlarni olishda xatolik:', err);
      }
    };

    fetchContracts();
  }, []);
  // console.log(userName, userRole)

  // 🔍 Real-time filter
  const filteredContracts = contracts.filter((contract) =>
    (contract?.number || '').toLowerCase().includes(search.toLowerCase()) ||
    (contract?.company || '').toLowerCase().includes(search.toLowerCase()) ||
    (contract?.person || '').toLowerCase().includes(search.toLowerCase()) ||
    (contract?.fileName || '').toLowerCase().includes(search.toLowerCase())
  );



  // useEffect(() => {
  //   const fetchContracts = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:5000/api/contracts');
  //       setContracts(res.data);
  //     } catch (error) {
  //       console.error('Maʼlumotlarni olishda xatolik:', error);
  //     }
  //   };

  //   fetchContracts();
  // }, []);
  

  return (
    <div className='container-fluid'>
      {/* <h2>🏠 Bosh sahifa</h2> */}
      <h2 className='mb-4'>Shartnomalar tizimiga xush kelibsiz {userName}!</h2>

      {/* <div>
        <div className='container-fluid'>
      <SearchBar
    searchTerm={search}
    onSearch={setSearch}
    placeholder="🔍 Shartnoma raqami, kontragent, mas’ul shaxs yoki fayl bo‘yicha qidiruv"
  />

  {search && filteredContracts.length === 0 && (
    <div className="alert alert-warning">
      “<strong>{search}</strong>” bo‘yicha hech qanday hujjat topilmadi.
    </div>
  )}
        </div>
        <div>
          <button>
            Button
          </button>
        </div>

      </div> */}
      {/* <SearchBarWithButton
        searchTerm={search}
        onSearch={setSearch}
        placeholder="🔍 Shartnoma raqami, kontragent, mas’ul shaxs yoki fayl bo‘yicha qidiruv"
        buttonLabel="Shartnoma qo‘shish"
        buttonRoute="/add"
      /> */}

      {/* {search && filteredContracts.length === 0 && (
        <Alert variant="warning">
          “<strong>{search}</strong>” bo‘yicha hech qanday hujjat topilmadi.
        </Alert>
      )} */}
      <ContractTable contracts={filteredContracts} />
    </div>
  );
};

export default Home;

