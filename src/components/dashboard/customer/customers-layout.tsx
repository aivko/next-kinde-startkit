"use client";

import React, { useState, createContext, useContext } from 'react';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';

interface Customer {
  vat:string,
  iban:string,
  email:string,
  notes:string,
  firstName:string,
  companyName:string,
  mobileNumber:string,
  electricitySelected:boolean,
  gasSelected:boolean,
  fibreSelected:boolean,
  officeAddress:string,
  officeCity:string,
  officePostCode:string,
  officeProvince:string,
  operationAddress:string,
  operationCity:string,
  operationPostCode:string,
  operationProvince:string,
  phoneNumber:string,
}

interface ClientContextType {
  customersContext: Array<object>;
  setCustomersContext: (customersContext: any) => void;
  customerContext: Customer | {};
  setCustomerContext: (customerContext: any) => void;
  isModalOpenContext: boolean;
  setModalOpenContext: (isOpen: boolean) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const useCustomerContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useCustomerContext must be used within a ClientProvider');
  }
  return context;
}

export function CustomersLayout(): React.ReactElement {
  const [customersContext, setCustomersContext] = useState<Array<any>>([]);
  const [customerContext, setCustomerContext] = useState<Customer | undefined>(undefined);
  const [isModalOpenContext, setModalOpenContext] = useState<boolean>(false);

  const contextValue: ClientContextType = {
    customersContext,
    setCustomersContext,
    customerContext,
    setCustomerContext,
    isModalOpenContext,
    setModalOpenContext
  };

  return (
    <ClientContext.Provider value={contextValue}>
      <>
        <CustomersFilters />
        <CustomersTable />
      </>
    </ClientContext.Provider>
  );
}
