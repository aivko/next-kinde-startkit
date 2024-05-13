"use client";

import React from "react";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";

export default function PdfViewer({ pdfUrl }) {
  return (
    <PDFViewer width="100%" height="800px" url={pdfUrl} src={pdfUrl}>
      <Document width="100%">
        <Page pageNumber={1} />
      </Document>
    </PDFViewer>
  )
}