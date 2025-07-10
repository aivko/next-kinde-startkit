import * as React from 'react';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Chip from "@mui/material/Chip";
import { setStatusColors, setStatusLabel } from "@/app/dashboard/helpers";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TableContainer from "@mui/material/TableContainer";
import { Transition } from "@/components/dashboard/customer/helpers";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import { ClientForm } from "@/components/dashboard/shared/ClientForm";
import { removeCustomer } from "@/components/dashboard/customer/api";
import DescriptionIcon from "@mui/icons-material/Description";
import Tooltip from '@mui/material/Tooltip';
import AgencyContractView from "@/components/dashboard/agency/agency-contract-view";

interface Column {
  id: 'name' | 'email' | 'luce' | 'gas' | 'action' | 'fibra' | 'offerta';
  label: string;
  minWidth?: number;
  title: string | JSX.Element;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Cliente', title: 'Nome del cliente' },
  { id: 'email', label: 'Email', title: 'Email del cliente' },
  { id: 'luce', label: 'Stato Luce', title: 'Stato del contratto luce' },
  { id: 'gas', label: 'Stato Gas', title: 'Stato del contratto gas' },
  { id: 'fibra', label: 'Stato Fibra', title: 'Stato del contratto fibra' },
  { id: 'action', label: 'Azioni', title: 'Azioni disponibili per il cliente' },
  { id: 'offerta', label: 'Offerta', title: (<>Grey - contract not sending yet. <br />Blue - contract is pending to accept. <br />Green - contract is accepted.</>) },
];

export default function StickyTable({ customers, handleEditCustomer, handleDeleteCustomer, agencyData = {} }) {
  const [isDialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [openContractView, setOpenContractView] = React.useState<boolean>(false);
  const [isModalOpen, setModalOpen] = React.useState<boolean | false>(false);
  const [agencyClient, setAgencyClient] = React.useState<object>({});
  const [customer, setCustomer] = React.useState<{}>({});

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleModal = (val:boolean) => {
    setModalOpen(val);
  };

  const handleCustomers = (customers:any) => {
    handleEditCustomer(customers);
  };

  const handleEdit = async (customer: object) => {
    setCustomer(customer);
    setModalOpen(true);
  };

  const handleDelete = async (client: object) => {
    setDialogOpen(true);
    setAgencyClient(client)
  };

  const handleShowContractView = async (customer: any) => {
    setCustomer(customer);
    setOpenContractView(true);
  }

  const handleCloseAgencyView = () => {
    setOpenContractView(false);
  };

  const setOfferStatus = (customer:any) => {
    const status = customer.offerAccepted;
    return {
      color: status === '1' ? 'info' : status === '2' ? 'success' : 'inherit',
      text: status === '1' ? 'pending to accept' : status === '2' ? 'accepted' : 'not sending yet'
    }
  };

  const handleDeleteClient = async () => {
    try {
      await removeCustomer(agencyClient);
      const updatedCustomers = customers.filter((customer: { id: any; }) => customer.id !== agencyClient.id);
      handleDeleteCustomer(updatedCustomers)
    } catch (error) {
      console.error("Error occurred while deleting customer:", error);
    } finally {
      setAgencyClient({});
      setDialogOpen(false);
    }
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <Tooltip key={column.id} title={column.title}>
                  <TableCell style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                </Tooltip>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer:any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={customer.id}>
                  <TableCell>
                    { customer.firstName }, { customer.companyName }
                  </TableCell>
                  <TableCell>
                    { customer.email }
                  </TableCell>
                  <TableCell>
                    {
                      customer?.pod_status && customer?.pod && <Chip
                        size="small"
                        sx={{ minWidth: '80px' }}
                        label={setStatusLabel(customer?.pod_status)}
                        color={setStatusColors(customer?.pod_status)}
                      />
                    }
                  </TableCell>
                  <TableCell>
                    {
                      customer?.pdr_status && customer?.pdr && <Chip
                        size="small"
                        sx={{ minWidth: '80px' }}
                        label={setStatusLabel(customer?.pdr_status)}
                        color={setStatusColors(customer?.pdr_status)}
                      />
                    }
                  </TableCell>
                  <TableCell>
                    {
                      customer?.fibra_status && customer?.fibreSelected && <Chip
                        size="small"
                        sx={{ minWidth: '80px' }}
                        label={setStatusLabel(customer?.fibra_status)}
                        color={setStatusColors(customer?.fibra_status)}
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
                      onClick={() => handleDelete(customer)}
                      aria-label="delte"
                      size="small"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={setOfferStatus(customer).text}>
                      <IconButton
                        onClick={() => handleShowContractView(customer)}
                        aria-label={setOfferStatus(customer).text}
                        size="small"
                      >
                        <DescriptionIcon color={ setOfferStatus(customer).color } />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {
        customer?.id && <ClientForm
          role="super_admin"
          customer={customer}
          customers={customers}
          isModalOpen={isModalOpen}
          setCustomers={handleCustomers}
          setModalOpen={handleModal}
          agencyData={agencyData}
        />
      }
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="alert-dialog-title">
          Sei sicuro di cancellare?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Questa finestra di dialogo modale ti chiede di confermare la tua decisione di eliminare un cliente dall'agenzia. Facendo clic su "Cancellare", procederai con il processo di eliminazione.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<DeleteIcon />}
            color="error"
            variant="contained"
            size="medium"
            onClick={handleDeleteClient}
            autoFocus
            sx={{
              minWidth: '100px'
            }}
          >
            Cancellare</Button>
          <Button
            color="info"
            variant="contained"
            size="medium"
            onClick={handleDialogClose}
            sx={{
              minWidth: '100px'
            }}
          >
            Annulla
          </Button>
        </DialogActions>
      </Dialog>
      <AgencyContractView
        customer={customer}
        openContractView={openContractView}
        onAction={handleCloseAgencyView}
      />
    </>
  );
}
