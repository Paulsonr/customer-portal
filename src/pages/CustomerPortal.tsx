import { useState } from "react";
import CustomerList from "../components/CustomerList";
import CustomerDetails from "../components/CustomerDetails";
import { Customer } from "../utils/types";
import "./styles/CustomerPortal.css";

const CustomerPortal = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  return (
    <div className="customer-portal-main">
      <h3 className="page-header">Customer Portal</h3>
      <div className="customer-portal-container">
        <CustomerList
          selectedCustomer={selectedCustomer}
          onSelectCustomer={setSelectedCustomer}
        />
        {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
      </div>
    </div>
  );
};

export default CustomerPortal;
