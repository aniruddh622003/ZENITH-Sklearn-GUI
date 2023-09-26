"use client";
import UploadIcon from "@mui/icons-material/Upload";
import { ArrowForwardIos } from "@mui/icons-material";
import Upload from "@/components/Upload";
import React, { useEffect } from "react";
import styles from "./index.module.css";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Snackbar,
} from "@mui/material";

const UploadDataset = () => {
  const [snackProgress, setSnackProgress] = React.useState({
    uploading: false,
    uploaded: false,
  });
  const [uploaded, setUploaded] = React.useState(false);
  const [datasetInfo, setDatasetInfo] = React.useState({
    rows: 0,
    columns: 0,
  });

  const upload = async (file) => {
    setSnackProgress((prev) => ({ ...prev, uploading: true }));
    const body = new FormData();
    body.append("file", file);
    // await new Promise((r) => setTimeout(r, 2000));
    await fetch("/api/upload_and_process_file", {
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((res) =>
        setDatasetInfo({
          rows: res.rows,
          columns: res.columns,
        })
      );
    setSnackProgress((prev) => ({ ...prev, uploading: false, uploaded: true }));
    setUploaded(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>Upload Dataset</h1>
          <p className={styles.quote}>
            Data is a precious thing and will last longer than the systems
            themselves.
          </p>
          <p className={styles.quote}>- Tim Berners-Lee</p>
        </div>
        <Box
          sx={{
            backgroundColor: "primary.main",
          }}
          className={styles.line}
        ></Box>
        <div className={styles.upload}>
          <Collapse in={snackProgress.uploaded} sx={{ mb: "20px" }}>
            <Alert
              severity="success"
              sx={{ width: "100%" }}
              onClose={() => {
                setSnackProgress((prev) => ({ ...prev, uploaded: false }));
              }}
            >
              <AlertTitle>Dataset Uploaded Successfully</AlertTitle>
              <p>
                Dataset Info - Rows: {datasetInfo.rows}, Columns:{" "}
                {datasetInfo.columns}
              </p>
            </Alert>
          </Collapse>
          <Upload onSubmit={upload} />
        </div>
      </div>
      <div className={styles.next}>
        <Button
          variant="outlined"
          color="primary"
          disabled={!uploaded}
          endIcon={<ArrowForwardIos />}
        >
          Next
        </Button>
      </div>
      <Snackbar
        open={snackProgress.uploading}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() =>
          setSnackProgress((prev) => ({ ...prev, uploading: false }))
        }
      >
        <Alert
          onClose={() =>
            setSnackProgress((prev) => ({ ...prev, uploading: false }))
          }
          severity="info"
          sx={{ width: "100%" }}
        >
          Uploading...
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackProgress.uploaded}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => {
          setSnackProgress((prev) => ({ ...prev, uploaded: false }));
        }}
        autoHideDuration={5000}
      >
        <Alert
          onClose={() => {
            setSnackProgress((prev) => ({ ...prev, uploaded: false }));
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Dataset Uploaded
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UploadDataset;
