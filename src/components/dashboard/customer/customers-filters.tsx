"use client";

import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchBar from "material-ui-search-bar";
import { CustomersForm } from '@/components/dashboard/customer/customers-form';
import { useCustomerContext } from "@/components/dashboard/customer/customers-layout";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { CREATING } from "@/components/dashboard/customer/constants";


export function CustomersFilters() {
  const {
    setModalOpenContext,
    setCustomerContext,
    isModalOpenContext} = useCustomerContext();

  const handleClick = () => {
    setCustomerContext({})
    setModalOpenContext(true);
  };

  return (
    <React.Fragment>
      <Card sx={{ p: 2, justifyContent: 'space-between', display: 'flex' }}>
        <OutlinedInput
          size="small"
          defaultValue=""
          fullWidth
          placeholder="Cerca cliente"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{ maxWidth: '500px' }}
        />
        <Button
          startIcon={<AddIcon />}
          onClick={handleClick}
          variant="contained"
          size="medium">
          Aggiungi clienti
        </Button>
      </Card>
      {
        isModalOpenContext && <CustomersForm
          mode={CREATING}
        />
      }
    </React.Fragment>
  );
}
