import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import * as Yup from "yup";
import { phoneRegExp } from "@/components/dashboard/agency/constants";

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
  pod: string;
  pgr: string;
  pod_transfer: string;
  pdr_transfer: string;
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('L\'e-mail è obbligatoria'),
  vat: Yup.string().required('E\' richiesta l\'IVA'),
  iban: Yup.string().required('È richiesto l\'IBAN'),
  firstName: Yup.string().required('Il nome del proprietario è obbligatorio'),
  companyName: Yup.string().required('Nome azienda/Cognome è obbligatorio'),
  operationAddress: Yup.string().required('È obbligatorio l\'indirizzo di fornitura completo di numero civico'),
  operationPostCode: Yup.string().required('È richiesto il codice postale'),
  operationProvince: Yup.string().required('La provincia è obbligatoria'),
  operationCity: Yup.string().required('La città è obbligatoria'),
  officeAddress: Yup.string().required('L\'indirizzo della sede legale è obbligatorio'),
  officePostCode: Yup.string().required('È richiesto il codice postale dell\'ufficio'),
  officeCity: Yup.string().required('La città dell\'ufficio è obbligatoria'),
  officeProvince: Yup.string().required('La provincia dell\'ufficio è obbligatoria'),
  mobileNumber: Yup.string().matches(phoneRegExp, 'Il numero di telefono non è valido').required('Il numero di telefono è obbligatorio'),
  pod_transfer: Yup.string(),
  pdr_transfer: Yup.string(),
  notes: Yup.string().notRequired(),
  gasSelected: Yup.boolean(),
  fibreSelected: Yup.boolean(),
  electricitySelected: Yup.boolean().when(['gasSelected', 'fibreSelected'], ([], schema, values) => {
    const { gasSelected, fibreSelected } = values.parent;
    if (!values.value ||  !gasSelected && !fibreSelected) { return schema.required('Il servizio clienti è obbligatorio'); }
    return schema;
  }),
  pod: Yup.string().when('electricitySelected', (electricitySelected, schema) => {
    if (electricitySelected[0] === true) { return schema.required('Il campo è obbligatiorio'); }
    return schema;
  }),
  pdr: Yup.string().when('gasSelected', (gasSelected, schema) => {
    if (gasSelected[0] === true) { return schema.required('Il campo è obbligatiorio'); }
    return schema;
  }),
});

export const hiddenInputStyles = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
};

export const errorText = {
  color: '#f04438',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  fontWeight: 400,
  fontSize: '0.75rem',
  lineHeight: '1.66',
  textAlign: 'left',
  margin: '4px 14px 0 14px',
};