"use client";

import React, {useEffect, useState} from 'react';
import PdfViewer from "@/components/dashboard/shared/PdfViewer";
import Typography from "@mui/material/Typography";
import { fetchAdmin } from "@/components/dashboard/agency/api";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {IKContext, IKUpload} from "imagekitio-react";
import {hiddenInputStyles} from "@/components/dashboard/customer/helpers";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
const pdfUrl = 'https://ik.imagekit.io/gjo0mtzlyq/pdf/COMPARATIVA_PREZZI_DICEMBRE.pdf';
import { authenticator, purgeCache } from '@/helpers/imagekit';

export default function Information () {
    const [ role, setRole ] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const onErrorIKU = (error) => {
        setLoading(false);
    };

    const onSuccessIKU = (res: { url: any; }) => {
        setLoading(false);
        purgeCache(res?.url);
    };

    useEffect(() => {
        fetchAdmin().then(res => {
            setRole(res?.data?.role)
        });
    }, []);

  return (
    <>
      <div>
          <Typography mb={2} variant="h4">Comparazione tariffe - provvigioni</Typography>
          {
              role === 'super_admin' && (
                  <Box mb={2}>
                      <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                          disabled={loading}
                          onClick={() => setLoading(true)}
                      >
                          Cambia PDF per info & prezzi
                          <IKContext
                              publicKey="public_3KePOhstCduL+PbBlMhQP3xbLyw="
                              urlEndpoint="https://ik.imagekit.io/gjo0mtzlyq"
                              authenticator={authenticator}
                          >
                              <IKUpload
                                  hidden
                                  fileName="COMPARATIVA_PREZZI_DICEMBRE_TEST.pdf"
                                  useUniqueFileName={false}
                                  folder={"/pdf"}
                                  onError={onErrorIKU}
                                  onSuccess={onSuccessIKU}
                                  onUploadStart={() => setLoading(true)}
                                  style={hiddenInputStyles}
                                  accept=".pdf"
                              />
                          </IKContext>
                      </Button>
                  </Box>
              )
          }
      </div>

      <PdfViewer pdfUrl={pdfUrl} />
    </>
  );
};
