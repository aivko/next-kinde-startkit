"use client";

import React, { useState } from 'react';

import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';

export function CustomersLayout(): React.JSX.Element {
  const [customer, setCustomer] = useState({  });

  const newCustomerCreated  = (customer:object) => {
    setCustomer(customer);
  };
  return (
    <>
      <CustomersFilters newCustomerCreated={newCustomerCreated} />
      <CustomersTable customer={customer} />
    </>
  );
}