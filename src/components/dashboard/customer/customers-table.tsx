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
import { ClientForm } from "@/components/dashboard/shared/ClientForm";
import { useCustomerContext } from "@/components/dashboard/customer/customers-layout";
import CircularIndeterminate from '@/components/dashboard/shared/CircularIndeterminate';
import { fetchAdmin } from "@/components/dashboard/agency/api";

export function CustomersTable() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [agencyId, setAgencyId] = useState<string>('');

  const {
    isModalOpenContext,
    setModalOpenContext,
    setCustomerContext,
    setCustomersContext,
    customerContext,
    customersContext,
  } = useCustomerContext();

  useEffect(() => {
    fetchAdmin().then(res => {
      const { id } = res.data;
      setAgencyId(id);
      fetchAllCustomer({ id })
        .then(res => {
          // show last added customers first
          const customersList = res.data || [];
          setCustomersContext(customersList.reverse());
      })
        .then(() => {
          setLoading(false);
        });
    })

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
    const customer = await fetchCustomer({
      customerId: id,
      agencyId
    });
    setCustomerContext(customer.data);
    setModalOpenContext(true);
  };

  const handleCustomers = async (value) => {
    setCustomersContext(value)
  };

  const handleModal = async (value:boolean) => {
    setModalOpenContext(value);
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
      {
        isLoading && <CircularIndeterminate />
      }
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Nome della ditta</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Stato</TableCell>
              <TableCell>Azioni</TableCell>
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
        isModalOpenContext && <ClientForm
          customer={customerContext}
          customers={customersContext}
          isModalOpen={isModalOpenContext}
          setCustomers={handleCustomers}
          setModalOpen={handleModal}
        />
      }
    </Card>
  );
}
