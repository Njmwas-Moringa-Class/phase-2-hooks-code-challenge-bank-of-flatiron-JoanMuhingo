import React, { useState, useEffect } from 'react';
import Search from './Search';
import AddTransactionForm from './AddTransactionForm'; 
import TransactionsList from './TransactionsList'; 

function AccountContainer() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm ,setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001/transactions')
      .then((response) => {
        if (!response.ok) {
          throw new Error('ERROR');
        }
        return response.json();
      })
      .then((result) => {
        console.log(result); 
        setData(result);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  },
   []);

 const handleAddTransaction = (newTransaction) => {
  setData((prevData =>[...prevData, newTransaction]))
 }

 const handleSearch = (term) =>{
  setSearchTerm(term);
 }
  return (
    <div>
      <Search onSearch={handleSearch}/>
      <AddTransactionForm onAddTransaction={handleAddTransaction}/>
      <TransactionsList data={data} error={error} searchTerm={searchTerm} />
    </div>
  );
}

export default AccountContainer;



