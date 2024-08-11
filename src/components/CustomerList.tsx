import React, { useState, useEffect } from "react";
import { Customer } from "../utils/types";
import data from "../data/Customer.json";
import "./styles/CustomerList.css";
const CustomerList: React.FC<{
  selectedCustomer: null | Customer;
  onSelectCustomer: (customer: Customer) => void;
}> = ({ selectedCustomer, onSelectCustomer }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // axios.get("../data/Customer").then((response) => {
    // }); mock api
    const response = data?.customers;
    setCustomers(response);
    onSelectCustomer(response[0]);
  }, []);

  return (
    <div className="customer-list">
      {!customers ? (
        <p>Loading...</p>
      ) : (
        customers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => onSelectCustomer(customer)}
            className={`customer-card ${
              customer === selectedCustomer && "selected"
            }`}
          >
            <h3>{customer.name}</h3>
            <p>{customer.title}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerList;
