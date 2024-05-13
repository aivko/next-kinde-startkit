"use client";

import React from 'react';
import PdfViewer from "@/components/dashboard/shared/PdfViewer";
import Typography from "@mui/material/Typography";
const pdfUrl = 'https://ik.imagekit.io/gjo0mtzlyq/pdf/CHI_SIAMO.pdf';

export default function About () {
  return (
    <>
      <Typography mb={2} variant="h4">Chi siamo</Typography>
      <PdfViewer pdfUrl={pdfUrl} />
    </>
  );
};
