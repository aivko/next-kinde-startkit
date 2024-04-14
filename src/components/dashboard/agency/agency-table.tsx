import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { fetchAllCustomer, fetchCustomer, removeCustomer } from "@/components/dashboard/customer/api";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ClientForm } from "@/components/dashboard/shared/ClientForm";
import { setStatusLabel, setStatusColors } from "@/app/dashboard/helpers";

interface Column {
  id: 'name' | 'email' | 'pod' | 'companyName' | 'action' | 'pdr';
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: 'companyName', label: 'Nome della ditta' },
  { id: 'name', label: 'Nome' },
  { id: 'email', label: 'Email' },
  { id: 'pod', label: 'Stato POD' },
  { id: 'pdr', label: 'Stato PRD' },
  { id: 'action', label: 'Azione' },
];

export default function AgencyTable({ agencies, adminInfo }) {
  const [isModalOpen, setModalOpen] = React.useState<boolean | false>(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [customer, setCustomer] = React.useState<{}>({});
  const [customers, setCustomers] = React.useState<[]>([]);
  const [isLoading, setLoading] = React.useState<boolean | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setCustomers([]);
    setExpanded(isExpanded ? panel : false);
  };

  const handleViewClients = (id: string) => {
    setLoading(true);
    fetchAllCustomer({ id })
      .then(res => {
        setCustomers(res.data);
      }).finally(() => {
        setLoading(false);
    })
  }

  const handleModal = (val:boolean) => {
    setModalOpen(val);
  };

  const handleCustomers = (val) => {
    setCustomers(val);
  };

  const handleEdit = async (customer: object) => {
    setCustomer(customer);
    setModalOpen(true);
  };

  const handleDelete = async (customer: object) => {
    setCustomer(customer);
  };

  return (
    <>
      {
        agencies.map(agency => (
          <Accordion
            key={agency.id}
            expanded={expanded === agency.id}
            onChange={handleChange(agency.id)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '30%', flexShrink: 0 }}>
                { agency.companyName }
              </Typography>
              <Typography sx={{ width: '40%', color: 'text.secondary' }}>
                { agency.email }
              </Typography>
              <Chip
                sx={{ lineHeight: 1 }}
                size="small"
                label={ agency.isVerified ? 'verificato' : 'non verificato' }
                color={ agency.isVerified ? 'success' : 'primary' } variant="outlined"
              />
            </AccordionSummary>
            <AccordionDetails>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <b>Nome della ditta:</b> { agency.companyName }
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <b>Email:</b> { agency.email }
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <b>Nome:</b> { agency.firstName }
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <b>IBAN:</b> { agency.iban } | VAT: { agency.vat }
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <b>Numero di cellulare e numero di telefono:</b> { agency.mobileNumber }, { agency.phoneNumber }
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <b>Indirizzo dell'ufficio:</b> { agency.officeCity }, { agency.officeAddress }, { agency.officeProvince }, { agency.officePostCode }
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <b>Indirizzo dell'operazione:</b> { agency.operationCity }, { agency.operationAddress }, { agency.operationProvince }, { agency.operationPostCode }
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <b>Sito web:</b> { agency.website }
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <b>Appunti:</b> { agency.notes }
                  </Typography>
                </CardContent>
                <CardActions>
                  <LoadingButton
                    onClick={() => handleViewClients(agency.id)}
                    loading={isLoading}
                    variant="outlined"
                  >
                    <span>Visualizza i clienti dell'agenzia</span>
                  </LoadingButton>
                </CardActions>
              </Card>
            </AccordionDetails>
            {
              customers.length > 0 && <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customers.map((customer) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={customer.id}>
                            <TableCell>
                              { customer.companyName }
                            </TableCell>
                            <TableCell>
                              { customer.firstName }
                            </TableCell>
                            <TableCell>
                              { customer.email }
                            </TableCell>
                            <TableCell>
                              {
                                customer?.pod_status && <Chip
                                  size="small"
                                  sx={{ minWidth: '100px' }}
                                  label={setStatusLabel(customer?.pod_status)}
                                  color={setStatusColors(customer?.pod_status)}
                                />
                              }
                            </TableCell>
                            <TableCell>
                              {
                                customer?.pdr_status && <Chip
                                  size="small"
                                  sx={{ minWidth: '100px' }}
                                  label={setStatusLabel(customer?.pdr_status)}
                                  color={setStatusColors(customer?.pdr_status)}
                                />
                              }
                            </TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => handleEdit(customer)}
                                aria-label="edit"
                                size="small"
                              >
                                <EditIcon />
                              </IconButton>

                              <IconButton
                                onClick={() => handleDelete(customer.id)}
                                aria-label="delte"
                                size="small"
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            }
            {
              customer?.id && <ClientForm
                role={adminInfo.role}
                customer={customer}
                customers={customers}
                isModalOpen={isModalOpen}
                setCustomers={handleCustomers}
                setModalOpen={handleModal}
              />
            }
          </Accordion>
        ))
      }
    </>
  );
}