import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

interface AdminInfo {
  email: string;
  vat: string;
  iban: string;
  firstName: string;
  companyName: string;
  operationAddress: string;
  operationPostCode: string;
  operationProvince: string;
  operationCity: string;
  officeAddress: string;
  officePostCode: string;
  officeCity: string;
  officeProvince: string;
  website: string;
  phoneNumber: string;
  mobileNumber: string;
  notes: string;
  isVerified: boolean;
}

interface AccountInfoProps {
  adminInfo: AdminInfo;
  handleFormEditing: () => void;
}

export const AccountInfo: FC<AccountInfoProps> = ({ adminInfo, handleFormEditing }) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={6} md={8} xs={12}>
        <Card>
          <CardContent>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <Stack spacing={1} sx={{ textAlign: 'center' }}>
                <Typography variant="h5">{adminInfo.firstName}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {adminInfo.companyName}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {adminInfo.email}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {adminInfo.phoneNumber}
                </Typography>
                <Chip label={ adminInfo.isVerified ? 'verificato' : 'non verificato' } color={ adminInfo.isVerified ? 'success' : 'primary' } variant="outlined" />
              </Stack>
            </Stack>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              onClick={handleFormEditing}
              fullWidth
              variant="text"
            >
              Modifica agenzia
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
