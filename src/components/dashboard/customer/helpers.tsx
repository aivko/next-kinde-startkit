import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import * as Yup from "yup";
import { phoneRegExp } from "@/components/dashboard/account/constants";

export const mergeObjects = (mainObj, obj) => {
  return { ...mainObj, ...obj };
};

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface FormData {
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
  phoneNumber: string;
  mobileNumber: string;
  notes: string;
  electricitySelected: boolean;
  gasSelected: boolean;
  fibreSelected: boolean;
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  vat: Yup.string().required('Office province is required'),
  iban: Yup.string().required('Office province is required'),
  firstName: Yup.string().required('First name is required'),
  companyName: Yup.string().required('Company name is required'),
  operationAddress: Yup.string().notRequired(),
  operationPostCode: Yup.string().notRequired(),
  operationProvince: Yup.string().notRequired(),
  operationCity: Yup.string().notRequired(),
  officeAddress: Yup.string().required('Registered office address is required'),
  officePostCode: Yup.string().required('Office post code is required'),
  officeCity: Yup.string().required('Office city is required'),
  officeProvince: Yup.string().required('Office province is required'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
  mobileNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
  notes: Yup.string().notRequired(),
  electricitySelected: Yup.boolean().notRequired(),
  gasSelected: Yup.boolean().notRequired(),
  fibreSelected: Yup.boolean().notRequired(),
});