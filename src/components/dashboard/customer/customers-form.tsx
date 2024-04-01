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
import { FormData, Transition, validationSchema, mergeObjects, hiddenInputStyles, errorText } from "@/components/dashboard/customer/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCustomer, updateCustomer } from "@/components/dashboard/customer/api";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { useCustomerContext } from "@/components/dashboard/customer/customers-layout";
import { CREATING, EDITING } from "@/components/dashboard/customer/constants";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteClientFiles, saveClientFiles } from "@/components/dashboard/api/dropBox";

export function CustomersForm({ customer= {} }) {
  const [addedFiles, setAddedFiles] = useState<Array<any>>([]);
  const [addedFilesError, setAddedFilesError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { isModalOpenContext,
    setModalOpenContext,
    customersContext,
    setCustomersContext
  } = useCustomerContext();

  useEffect(() => {
    if (customer.id) {
      setValue('companyName', customer.companyName);
      setValue('electricitySelected', customer.electricitySelected);
      setValue('email', customer.email);
      setValue('fibreSelected',  customer.fibreSelected);
      setValue('firstName', customer.firstName);
      setValue('gasSelected', customer.gasSelected);
      setValue('iban', customer.iban);
      setValue('mobileNumber', customer.mobileNumber);
      setValue('notes', customer.notes);
      setValue('officeAddress', customer.officeAddress);
      setValue('officeCity', customer.officeCity);
      setValue('officePostCode', customer.officePostCode);
      setValue('officeProvince', customer.officeProvince);
      setValue('operationAddress', customer.operationAddress);
      setValue('operationCity', customer.operationCity);
      setValue('operationPostCode', customer.operationPostCode);
      setValue('operationProvince', customer.operationProvince);
      setValue('phoneNumber', customer.phoneNumber);
      setValue('vat', customer.vat);
      setAddedFiles(customer.files);
    }
  }, [customer]);

  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });
  const handleClose = () => {
    setModalOpenContext(false);
  };

  const onError = () => {
      if (addedFiles?.length < 1) {
        setAddedFilesError(true);
      }
  };

  const onSubmit = async (data: FormData) => {
    if (addedFiles?.length < 1) {
      setAddedFilesError(true);
      return false;
    } else {
      data['files'] = addedFiles;

      if (customer?.id) {
        const result = mergeObjects(customer, data);
        updateCustomer(result).then(res => {
          const updatedCustomers = customersContext.filter(customer => customer.id !== res.data.id);
          setCustomersContext([res.data, ...updatedCustomers]);
          handleClose();
        })
      } else {
        createCustomer(data).then(res => {
          setCustomersContext([res.data, ...customersContext]);
          handleClose();
        })
      }
    }
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
      const fileData = event.target.result;
      setLoading(true);
      try {
        const response = await saveClientFiles({
          selectedFile,
          fileData
        })

        const {name, id} = response?.data;
        setAddedFiles([
          ...addedFiles,
          {
            name,
            id
          }
        ])
        setAddedFilesError(false);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
      }
    };

    fileReader.readAsArrayBuffer(selectedFile);
  };

  const handleDelete = async ({ name }) => {
    const result = await deleteClientFiles(name);
    const deletedFile = result.data.metadata;
    const updatedFiles = addedFiles.filter(file => file.id !== deletedFile.id);
    setAddedFiles(updatedFiles)

  };

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
      <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                  <Grid item sx={{ position: 'relative' }}>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      disabled={ loading || addedFiles?.length >= 6 }
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <input
                        hidden
                        type="file"
                        style={hiddenInputStyles}
                        onChange={handleFileChange}
                        accept=".jpg, .jpeg, .png, .doc, .docx, .pdf, .file"
                      />
                    </Button>
                    {addedFilesError &&  <Typography variant="body2" gutterBottom style={errorText}>You need to add at least one file</Typography>}
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: '#635bff',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} md={12}>
                    {
                      addedFiles?.length > 0 && addedFiles.map(file => <Chip
                        key={file.id}
                        label={file.name}
                        color="primary"
                        variant="outlined"
                        // onClick={() => handleClick(file)}
                        onDelete={() => handleDelete(file)}
                        deleteIcon={<DeleteIcon />}
                      />)
                    }
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