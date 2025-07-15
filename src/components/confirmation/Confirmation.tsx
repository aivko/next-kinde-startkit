"use client";

import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Link,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { updateCustomer } from "@/components/dashboard/customer/api";
import { base64ToObject } from "@/helpers/base64";
import { sendEmail } from "@/actions";

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#7700C4' }} elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="https://www.utenzia.it/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="https://www.utenzia.it/wp-content/uploads/2024/07/logo-utenzia-footer.png"
            alt="Utenzia logo"
            height={40}
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
}

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#7700C4', py: 3, color: '#fff', mt: 'auto' }}>
      <Container maxWidth="md">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Agropoli tel: 0974356842 email: info@utenzia.it
        </Typography>
        <Typography variant="body2" align="center">
          All rights reserved – MT Innova Srl – P.Iva 06188370651
        </Typography>
      </Container>
    </Box>
  );
}

export default function Confirmation() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const customer = params.get('customer')
    if (!customer) {
      return;
    }

    const customerData = base64ToObject(customer);
    handleOfferAcceptance(customerData);
  }, []);

  const handleOfferAcceptance = async (customer:any) => {
    if (!customer?.id || !customer?.agencyId) {
      console.warn('Missing required fields: id or agencyId');
      return;
    }

    try {
      await updateCustomer({
        ...customer,
        offerAccepted: "2",
      });

      await sendEmail({
        data: customer,
        type: 'confirmation',
        agency: {}
      });
    } catch (error) {
      console.error('Failed to update customer or send email:', error);
    }
  };


  const handleContactClick = () => {
    window.location.href = 'http://utenzia.it/#contatti';
  };

  return (
    <>
      <Header />
      <Toolbar />
      <Box sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%' }}>
            <Card sx={{ p: 4, borderRadius: 4, textAlign: 'center', boxShadow: 3, backgroundColor: '#fafafa' }}>
              <CardContent>
                <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Grazie per aver accettato la nostra offerta!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Abbiamo ricevuto la tua conferma. Riceverai presto un messaggio e una email per la firma del contratto e la finalizzazione dei dettagli.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 3, mt: 2 }}
                  onClick={handleContactClick}
                >
                  Contattaci
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
}
