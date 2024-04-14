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
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { fetchAllCustomer, fetchCustomer, removeCustomer } from "@/components/dashboard/customer/api";
import { ClientForm } from "@/components/dashboard/shared/ClientForm";
import { useCustomerContext } from "@/components/dashboard/customer/customers-layout";
import CircularIndeterminate from '@/components/dashboard/shared/CircularIndeterminate';
import { fetchAdmin } from "@/components/dashboard/agency/api";
import { setStatusLabel, setStatusColors } from "@/app/dashboard/helpers";

export function CustomersTable() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [agencyId, setAgencyId] = useState<string>('');
  const [role, setRole] = useState<string>('');

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
      const { id, role } = res.data;
      console.log(role)
      setRole(role)
      setAgencyId(id);
      fetchAllCustomer({ id })
        .then(res => {
          // show last added customers first
          const customersList = res.data || [];
          setCustomersContext(customersList.reverse());
        })
        .catch(() => {
          setLoading(false);
        }).finally(() => {
          setLoading(false);
      });
    })

  }, []);

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
              <TableCell>Stato POD</TableCell>
              <TableCell>Stato PRD</TableCell>
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
                  {
                    row?.pod_status && <Chip
                      size="small"
                      sx={{ minWidth: '100px' }}
                      label={setStatusLabel(row?.pod_status)}
                      color={setStatusColors(row?.pod_status)}
                    />
                  }

                </TableCell>
                <TableCell>
                  {
                    row?.pdr_status && <Chip
                      size="small"
                      sx={{ minWidth: '100px' }}
                      label={setStatusLabel(row?.pdr_status)}
                      color={setStatusColors(row?.pdr_status)}
                    />
                  }
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
          role={role}
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
