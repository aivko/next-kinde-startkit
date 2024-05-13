"use client";

import React from 'react';
import PdfViewer from "@/components/dashboard/shared/PdfViewer";
import Typography from "@mui/material/Typography";
const pdfUrl = 'https://ik.imagekit.io/gjo0mtzlyq/pdf/COMPARATIVA_PREZZI_MAGGIO_2024.pdf?updatedAt=1715514543149';

export default function Information () {
  return (
    <>
      <Typography mb={2} variant="h4">Info comparativa prezzi / provvigioni</Typography>
      <PdfViewer pdfUrl={pdfUrl} />
    </>
  );
};
