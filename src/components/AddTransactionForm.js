import React, {useState} from "react";

function AddTransactionForm({onAddTransaction}) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  });
  const handleChange = (e) =>{
    const  { name, value } = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };
  
  const handleSubmit =async (e) => {
    e.preventDefault();
    

    try{
     const response = await fetch('http://localhost:8001/transactions',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
     });
     if (!response.ok){
      throw new Error("Failed to add transaction");
     }
     onAddTransaction(formData);
     setFormData({
      date: "",
        description: "",
        category: "",
        amount: 0,
     });
    }
    catch (error) {
      console.error('Error posting transaction',error);
    }
  };
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit} >
        <div className="inline fields">
          <input type="date" name="date" value={formData.date} onChange={handleChange}/>
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange ={handleChange}/>
          <input type="text" name="category" placeholder="Category"value={formData.category} onChange ={handleChange} />
          <input type="number" name="amount" placeholder="Amount" step="0.01" value={formData.amount} onChange ={handleChange}/>
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
