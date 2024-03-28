"use client";

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import { FormData, Transition, validationSchema, mergeObjects } from "@/components/dashboard/customer/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCustomer, updateCustomer } from "@/components/dashboard/customer/api";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { useCustomerContext } from "@/components/dashboard/customer/customers-layout";
import { CREATING, EDITING } from "@/components/dashboard/customer/constants";

export function CustomersForm({ mode }) {
  const { isModalOpenContext,
    setModalOpenContext,
    customerContext,
    customersContext,
    setCustomersContext
  } = useCustomerContext();

  useEffect(() => {
    if (mode === EDITING) {
      setValue('companyName', customerContext.companyName);
      setValue('electricitySelected', customerContext.electricitySelected);
      setValue('email', customerContext.email);
      setValue('fibreSelected',  customerContext.fibreSelected);
      setValue('firstName', customerContext.firstName);
      setValue('gasSelected', customerContext.gasSelected);
      setValue('iban', customerContext.iban);
      setValue('mobileNumber', customerContext.mobileNumber);
      setValue('notes', customerContext.notes);
      setValue('officeAddress', customerContext.officeAddress);
      setValue('officeCity', customerContext.officeCity);
      setValue('officePostCode', customerContext.officePostCode);
      setValue('officeProvince', customerContext.officeProvince);
      setValue('operationAddress', customerContext.operationAddress);
      setValue('operationCity', customerContext.operationCity);
      setValue('operationPostCode', customerContext.operationPostCode);
      setValue('operationProvince', customerContext.operationProvince);
      setValue('phoneNumber', customerContext.phoneNumber);
      setValue('vat', customerContext.vat);
    }
  }, [customerContext]);

  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });
  const handleClose = () => {
    setModalOpenContext(false);
  };

  const onSubmit = async (data: FormData) => {
    if (mode === CREATING) {
      createCustomer(data).then(res => {
        setCustomersContext([res.data, ...customersContext]);
        handleClose();
      })
    } else if (mode === EDITING) {
      const result = mergeObjects(customerContext, data);
      updateCustomer(result).then(res => {
        setCustomersContext([res.data, ...customersContext]);
        handleClose();
      })
    }
  }

  return (
    <Dialog
      fullScreen
      open={isModalOpenContext}
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
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Fields Cliente Servizi
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            <CloseIcon />
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
                        labelPlacement="bottom"
                        label="Luce"
                        control={<Controller
                          control={control}
                          name="electricitySelected"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Checkbox
                              onChange={onChange}
                              onBlur={onBlur}
                              checked={value}
                            />
                          )}
                        />}
                      />

                      <FormControlLabel
                        labelPlacement="bottom"
                        label="Gas"
                        control={<Controller
                          control={control}
                          name="gasSelected"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Checkbox
                              onChange={onChange}
                              onBlur={onBlur}
                              checked={value}
                            />
                          )}
                        />}
                      />

                      <FormControlLabel
                        labelPlacement="bottom"
                        label="Fibra"
                        control={<Controller
                          control={control}
                          name="fibreSelected"
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Checkbox
                              onChange={onChange}
                              onBlur={onBlur}
                              checked={value}
                            />
                          )}
                        />}
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
              type="button"
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
  );
};