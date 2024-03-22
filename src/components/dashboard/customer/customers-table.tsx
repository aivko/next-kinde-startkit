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
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { fetchAllCustomer, removeCustomer } from "@/components/dashboard/customer/api";

export interface Customer {
  id: string;
  avatar: string;
  name: string;
  email: string;
  address: { city: string; state: string; country: string; street: string };
  phone: string;
  createdAt: Date;
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

export function CustomersTable({ customer }): React.JSX.Element {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchAllCustomer().then(res => {
      setCustomers(res.data);
    });
  }, []);

  useEffect(() => {
    setCustomers([customer, ...customers]);
  }, [customer]);

  const handleChange = (id:string) => {
    const array = customers.map(customer => {
      if (customer.id === id) {
        return { ...customer, isActive: !customer.isActive };
      }
      return customer;
    })

    setCustomers(array)
  };

  const handleEdit = (id:string) => {
    console.log(id)
  };

  const handleDelete = async (id:string) => {
    try {
      await removeCustomer(id);
      const updatedCustomers = customers.filter(customer => customer.id !== id);
      setCustomers(updatedCustomers);
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
            {customers.map((row) =>
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
                    onChange={() => handleChange(row.id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(row.id)}
                    aria-label="edit"
                    size="small"
                  >
                    <PencilSimpleIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDelete(row.id)}
                    aria-label="delte"
                    size="small"
                  >
                    <TrashIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
