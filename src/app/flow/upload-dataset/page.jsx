"use client";
import { ArrowForwardIos } from "@mui/icons-material";
import Upload from "@/components/Upload";
import React, { useEffect } from "react";
import Grid from '@mui/material/Grid';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Snackbar,
  Typography,
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
  const [err, setErr] = React.useState({
    error: false,
    message: "",
  });

  const upload = async (file) => {
    if (!file) {
      setErr({
        error: true,
        message: "No file selected",
      });
      return;
    }
    setSnackProgress((prev) => ({ ...prev, uploading: true }));
    // console.log(file ? file.name : "not present");
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
    <Grid sx={{height: '100%'}}>
      <Grid container sx={{ alignItems: 'center', height: '90%'}}>
        <Grid sx={{flex: '1', paddingLeft: '5rem', paddingRight: '2rem'}}>
          <Typography variant="h2">Upload Dataset</Typography>
          <Typography variant="h5">Data is a precious thing and will last longer than the systems themselves.</Typography>
          <Typography variant="h5" align="right">- Tim Berners-Lee</Typography>
        </Grid>
        <Box sx={{backgroundColor: "primary.main", width: "6px", height: "75%", borderRadius: '3px'}}></Box>
        <Grid sx={{flex: '1', paddingLeft: '2rem', paddingRight: '5rem'}}>
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
        </Grid>
      </Grid>
      <Grid sx={{display: 'flex', justifyContent: 'end', paddingRight: '5rem'}}>
        <Button
          variant="outlined"
          color="primary"
          disabled={!uploaded}
          endIcon={<ArrowForwardIos />}
        >
          Next
        </Button>
      </Grid>
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
      <Snackbar
        open={err.error}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => {
          setErr((prev) => ({ ...prev, error: false }));
        }}
        autoHideDuration={5000}
      >
        <Alert
          onClose={() => {
            setErr((prev) => ({ ...prev, error: false }));
          }}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {err.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default UploadDataset;
