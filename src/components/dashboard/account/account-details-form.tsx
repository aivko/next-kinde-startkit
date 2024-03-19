'use client';
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import {
  fetchAdmin,
  createAdmin,
  updateAdmin,
} from "@/components/dashboard/account/api";
import { phoneRegExp } from "@/components/dashboard/account/constants";
import { AccountInfo } from '@/components/dashboard/account/account-info';

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
}

export function AccountDetailsForm(): React.JSX.Element {
  const [adminInfo, setAdminInfo] = useState<FormData | null>(null);
  const [isVerified, setVerified] = useState<boolean>(false);
  const [isFormEditing, setFormEditing] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    companyName: Yup.string().required('Company name is required'),
    email: Yup.string().email().required('Email is required'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required')
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormEditing = (val:boolean = true) => {
    setFormEditing(val)
  };

  const fetchData = async () => {
    try {
      const res = await fetchAdmin();
      const { firstName, lastName, companyName, email, phoneNumber } = res;
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('companyName', companyName);
      setValue('email', email);
      setValue('phoneNumber', phoneNumber);
      setVerified(true);
      setAdminInfo(res);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (isVerified) {
      await updateAdmin({ data: data })
        .then(res => {
          setAdminInfo(res)
          handleFormEditing(false);
      });
    } else {
      await createAdmin(data);
      const resultVerified = await updateAdmin({
        data: {
          isVerified: true
        }
      });
      setVerified(resultVerified.isVerified);
    }
  }

  return (
    <>
      {
        !isFormEditing && isVerified && <AccountInfo
          adminInfo={adminInfo}
          handleFormEditing={handleFormEditing}
        />
      }
      {
        isFormEditing && <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={Boolean(errors.firstName)}
                      id="outlined-error-helper-text"
                      label="First name*"
                      helperText={errors?.firstName?.message}
                      variant="outlined"
                      {...register('firstName')}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <TextField
                      error={Boolean(errors.lastName)}
                      id="outlined-error-helper-text"
                      label="Last name*"
                      helperText={errors?.lastName?.message}
                      variant="outlined"
                      {...register('lastName')}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <TextField
                      error={Boolean(errors.email)}
                      id="outlined-error-helper-text"
                      label="Email*"
                      helperText={errors?.email?.message}
                      variant="outlined"
                      {...register('email')}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <TextField
                      error={Boolean(errors.phoneNumber)}
                      id="outlined-error-helper-text"
                      label="Phone number*"
                      helperText={errors?.phoneNumber?.message}
                      variant="outlined"
                      {...register('phoneNumber')}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl fullWidth required>
                    <TextField
                      error={Boolean(errors.companyName)}
                      id="outlined-error-helper-text"
                      label="Company Name*"
                      helperText={errors?.companyName?.message}
                      variant="outlined"
                      {...register('companyName')}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'space-between', p: 3 }}>
              <Button
                onClick={() => handleFormEditing(false)}
                size="medium"
                type="submit"
                variant="contained"
              >
                Cancel
              </Button>
              <Button size="medium" type="submit" variant="contained">Save</Button>
            </CardActions>
          </Card>
        </form>
      }
    </>
  );
}
