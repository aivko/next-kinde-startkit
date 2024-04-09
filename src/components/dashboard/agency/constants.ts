import * as Yup from "yup";

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const apiUrl = '/api/admin';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  officeAddress: Yup.string().required('Registered office address is required'),
  officePostCode: Yup.string().required('Office post code is required'),
  officeCity: Yup.string().required('Office city is required'),
  officeProvince: Yup.string().required('Office province is required'),
  vat: Yup.string().required('Office province is required'),
  iban: Yup.string().required('Office province is required'),
  companyName: Yup.string().required('Company name is required'),
  adminEmail: Yup.string().email().required('Email is required'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
  mobileNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
});

export interface FormData {
  adminEmail: string;
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
}