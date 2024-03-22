"use client";

import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {
  Transition,
  FormData,
  validationSchema
} from './helpers';
import { createCustomer } from "@/components/dashboard/customer/api";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";

export function CustomersFilters({ newCustomerCreated }): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data: FormData) => {
    createCustomer(data).then(res => {
      newCustomerCreated(res.data);
      handleClose();
    })
  }

  return (
    <React.Fragment>
      <Card sx={{ p: 2, justifyContent: 'space-between', display: 'flex' }}>
        <OutlinedInput
          defaultValue=""
          fullWidth
          placeholder="Cerca cliente"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: '500px' }}
        />
        <Button
          startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
          onClick={handleOpen}
          variant="contained"
          size="large">
          Aggiungi clienti
        </Button>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              {/*<CloseIcon />*/}
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Fields Cliente Servizi
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardContent>
              <Box mb={2} sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom mb={1} >
                  Informazioni aziendali
                </Typography>
                <Box mt={2} mb={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth>
                        <TextField
                          id="outlined-error-helper-text"
                          label="Ragione sociale"
                          variant="outlined"
                          {...register('companyName')}
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth required>
                        <TextField
                          error={Boolean(errors.firstName)}
                          id="outlined-error-helper-text"
                          label="Nome cognome Titolare*"
                          helperText={errors?.firstName?.message}
                          variant="outlined"
                          {...register('firstName')}
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth required>
                        <TextField
                          error={Boolean(errors.vat)}
                          id="outlined-error-helper-text"
                          label="Partita IVA*"
                          helperText={errors?.vat?.message}
                          variant="outlined"
                          {...register('vat')}
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth required>
                        <TextField
                          error={Boolean(errors.iban)}
                          id="outlined-error-helper-text"
                          label="IBAN (per pagamento provvigioni)*"
                          helperText={errors?.iban?.message}
                          variant="outlined"
                          {...register('iban')}
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth required>
                        <TextField
                          error={Boolean(errors.officeAddress)}
                          id="outlined-error-helper-text"
                          label="Indirizzo residenza*"
                          helperText={errors?.officeAddress?.message}
                          variant="outlined"
                          {...register('officeAddress')}
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth required>
                        <TextField
                          error={Boolean(errors.officePostCode)}
                          id="outlined-error-helper-text"
                          label="CAP*"
                          helperText={errors?.officePostCode?.message}
                          variant="outlined"
                          {...register('officePostCode')}
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth required>
                        <TextField
                          error={Boolean(errors.officeCity)}
                          id="outlined-error-helper-text"
                          label="Città*"
                          helperText={errors?.officeCity?.message}
                          variant="outlined"
                          {...register('officeCity')}
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth required>
                        <TextField
                          error={Boolean(errors.officeProvince)}
                          id="outlined-error-helper-text"
                          label="Provincia*"
                          helperText={errors?.officeProvince?.message}
                          variant="outlined"
                          {...register('officeProvince')}
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth>
                        <TextField
                          label="Indirizzo Sede Operative"
                          InputLabelProps={{ shrink: true }}
                          {...register('operationAddress')}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth>
                        <TextField
                          label="CAP"
                          InputLabelProps={{ shrink: true }}
                          {...register('operationPostCode')}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth>
                        <TextField
                          label="Città"
                          InputLabelProps={{ shrink: true }}
                          {...register('operationCity')}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth>
                        <TextField
                          label="Provincia"
                          InputLabelProps={{ shrink: true }}
                          {...register('operationProvince')}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
                <Typography variant="h5" gutterBottom mb={1}>
                  Informazioni sui contatti
                </Typography>
                <Box mt={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth required>
                        <TextField
                          error={Boolean(errors.email)}
                          id="outlined-error-helper-text"
                          label="Email*"
                          helperText={errors?.email?.message}
                          variant="outlined"
                          {...register('email')}
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth required>
                        <TextField
                          error={Boolean(errors.phoneNumber)}
                          id="outlined-error-helper-text"
                          label="Tell*"
                          helperText={errors?.phoneNumber?.message}
                          variant="outlined"
                          {...register('phoneNumber')}
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControl fullWidth required>
                        <TextField
                          error={Boolean(errors.mobileNumber)}
                          id="outlined-error-helper-text"
                          label="Cell*"
                          helperText={errors?.mobileNumber?.message}
                          variant="outlined"
                          {...register('mobileNumber')}
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Typography variant="h5" gutterBottom mb={1}>
                        Cliente Servizi
                      </Typography>
                      <FormGroup sx={{position: 'flex', flexDirection: 'row', alignItems:'center'}}>
                        <FormControlLabel
                          control={<Checkbox />}
                          labelPlacement="bottom"
                          label="Luce"
                          {...register('electricitySelected')}
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          labelPlacement="bottom"
                          label="Gas"
                          {...register('gasSelected')}
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          labelPlacement="bottom"
                          label="Fibra"
                          {...register('fibreSelected')}
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Box>
                <Typography variant="h5" gutterBottom mb={1} mt={3}>
                  Note
                </Typography>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      rows={4}
                      size="small"
                      {...register('notes')}
                    />
                  </FormControl>
                </Box>
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'space-between', p: 3 }}>
              <Button
                onClick={handleClose}
                size="medium"
                type="submit"
                variant="contained"
              >
                Annulla
              </Button>
              <Button
                size="medium"
                type="submit"
                variant="contained"
              >
                Salva
              </Button>
            </CardActions>
          </Card>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
