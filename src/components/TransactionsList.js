import React from "react";
import Transaction from "./Transaction";

function TransactionsList({data, error, searchTerm}) {
  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }
  const filterData = searchTerm
  ? data.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : data;
  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr> 
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
        </tr>
        {filterData.map((transaction) => (
          <Transaction
            key={transaction.id}
            id={transaction.id}
            date={transaction.date}
            description={transaction.description}
            category={transaction.category}
            amount={transaction.amount}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;
