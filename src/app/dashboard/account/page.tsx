import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';

export default async function Page(): Promise<React.JSX.Element> {
  return (
    <Stack spacing={3} p={5}>
      <div>
        <Typography variant="h4">Account</Typography>
      </div>
      <Grid container spacing={3}>
        <AccountDetailsForm />
      </Grid>
    </Stack>
  );
}
