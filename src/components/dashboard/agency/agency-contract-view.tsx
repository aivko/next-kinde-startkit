"use client";

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IKContext, IKUpload } from "imagekitio-react";
import { hiddenInputStyles } from "@/components/dashboard/customer/helpers";
import { useEffect, useState } from "react";
import ImageKit from "imagekit";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from '@mui/material/Box';
import emailjs from '@emailjs/browser';
import { objectToBase64 } from "@/helpers/base64";
import { updateCustomer } from "@/components/dashboard/customer/api";

export default function AgencyContractView({ openContractView, customer, onAction }) {
  const [open, setOpen] = React.useState(false);
  const [addedFiles, setAddedFiles] = useState<Array<any>>([]);
  const [addedFilesError, setAddedFilesError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (openContractView) {
      setOpen(openContractView);
    }

    return () => {
      setOpen(false);
    }
  }, [openContractView])

  const authenticator =  async () => {
    try {
      const imagekit = new ImageKit({
        publicKey: "public_3KePOhstCduL+PbBlMhQP3xbLyw=",
        privateKey : "private_ZGKnOmD8+jBaTXWGm2GrHCw0zgk=",
        urlEndpoint: "https://ik.imagekit.io/gjo0mtzlyq",
      });

      const getCredentials = () => {
        return new Promise((resolve,reject)=>{
          resolve(imagekit.getAuthenticationParameters())
        })
      };

      const data = await getCredentials();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const handleClose = () => {
    onAction();
    setAddedFiles([]);
    setOpen(false);
  };

  const handleOpenFileNewTab = async ({ id, name }) => {
    const url = `https://ik.imagekit.io/gjo0mtzlyq/${name}`
    window.open(url)
  };

  const handleDeleteFile = async (currentFile:any) => {
    const updatedFiles = addedFiles.filter(file => file.id !== currentFile.id);
    setAddedFiles(updatedFiles);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    emailjs.init('TZHCdMcBoY03FTWSJ');
    await emailjs.send("service_gn2k0kd","template_7ixdql2",{
      customerName: formJson?.name,
      pdfLink: addedFiles[0]?.url,
      pdfName: addedFiles[0]?.name,
      confirmationLink: `https://cheerful-sorbet-b08adf.netlify.app/confirmation?customer=${objectToBase64(customer)}`,
      name: formJson?.name,
      email: "info@utenzia.it",
      emailTo: formJson?.email,
    });

    updateCustomer({
      ...customer,
      offerAccepted: "1",
    })
      .then(() => { handleClose() })
      .catch((error) => { console.error("Error updating customer:", error) });
  };

  const onErrorIKU = (err:any) => {
    setLoading(false)
  };

  const onSuccessIKU = (res:any) => {
    setLoading(false);
    const { fileId, name } = res;
    setAddedFiles([
      ...addedFiles,
      {
        name,
        id: fileId,
        url: `https://ik.imagekit.io/gjo0mtzlyq/${name}`
      }
    ])
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Aggiungi informazioni sul cliente e carica il contratto</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText>
          Inserisci i dati del cliente e carica i file del contratto in formato PDF.
          Questo ci aiuta a organizzare tutto e a garantire che il tuo cliente riceva il contratto tempestivamente.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Indirizzo Email"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={customer?.email}
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={customer?.firstName}
          />
          <Box component="section" sx={{ pt: 1, pb: 2 }}>
            <Box sx={{ pb: 1 }}>
              {
                addedFiles?.length > 0 && addedFiles.map(file => <Chip
                  sx={{
                    marginRight: 1
                  }}
                  key={file.id}
                  label={file.name}
                  color="primary"
                  variant="outlined"
                  onClick={() => handleOpenFileNewTab(file)}
                  onDelete={() => handleDeleteFile(file)}
                  deleteIcon={<DeleteIcon />}
                />)
              }
            </Box>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              disabled={ loading }
              startIcon={<CloudUploadIcon />}
              onClick={() => setAddedFilesError(false)}
            >
              Caricare file
              <IKContext
                publicKey="public_3KePOhstCduL+PbBlMhQP3xbLyw="
                urlEndpoint="https://ik.imagekit.io/gjo0mtzlyq"
                authenticator={authenticator}
              >
                <IKUpload
                  hidden
                  onError={onErrorIKU}
                  onSuccess={onSuccessIKU}
                  onUploadStart={() => setLoading(true)}
                  style={hiddenInputStyles}
                  accept=".jpg, .jpeg, .png, .doc, .docx, .pdf,"
                />
              </IKContext>
            </Button>
          </Box>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleClose}
            >Cancellare</Button>
            <Button
              variant="contained"
              disabled={ addedFiles.length === 0 || addedFilesError }
              type="submit"
            >Invia modulo</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
