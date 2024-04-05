'use client';

import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { fetchAllCustomer, fetchCustomer, removeCustomer } from "@/components/dashboard/customer/api";
import { CustomersForm } from "@/components/dashboard/customer/customers-form";
import { useCustomerContext } from "@/components/dashboard/customer/customers-layout";
import { EDITING } from "@/components/dashboard/customer/constants";

export function CustomersTable() {
  const {
    isModalOpenContext,
    setModalOpenContext,
    setCustomerContext,
    setCustomersContext,
    customerContext,
    customersContext,
  } = useCustomerContext();

  useEffect(() => {
    fetchAllCustomer().then(res => {
      // hack to show last added customers first
      const customersList = res.data || [];
      setCustomersContext(customersList.reverse());
    });
  }, []);

  const handleChangeStatus = (id:string) => {
    const array = customersContext.map(customer => {
      if (customer.id === id) {
        return { ...customer, isActive: !customer.isActive };
      }
      return customer;
    })

    setCustomersContext(array)
  };

  const handleEdit = async (id: string) => {
    const customer = await fetchCustomer(id);
    setCustomerContext(customer.data);
    setModalOpenContext(true);
  };

  const handleDelete = async (id:string) => {
    try {
      await removeCustomer(id);
      const updatedCustomers = customersContext.filter(customer => customer.id !== id);
      setCustomersContext(updatedCustomers);
    } catch (error) {
      console.error("Error occurred while deleting customer:", error);
    }
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Company name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customersContext.map((row) =>
              <TableRow hover key={row.id} >
                <TableCell>
                  <Typography variant="subtitle2">{row.firstName}</Typography>
                </TableCell>
                <TableCell>{row.companyName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>
                  <Switch
                    checked={row.isActive}
                    onChange={() => handleChangeStatus(row.id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(row.id)}
                    aria-label="edit"
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDelete(row.id)}
                    aria-label="delte"
                    size="small"
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      {
        isModalOpenContext && <CustomersForm
          customer={customerContext}
        />
      }
    </Card>
  );
}
