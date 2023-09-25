"use client";
import UploadIcon from "@mui/icons-material/Upload";
import { ArrowForwardIos } from "@mui/icons-material";
import Upload from "@/components/Upload";
import React from "react";
import styles from "./index.module.css";
import { Box, Button } from "@mui/material";

const UploadDataset = () => {
  const upload = (file) => {
    console.log(file);
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
          <Upload onSubmit={upload} />
        </div>
      </div>
      <div className={styles.next}>
        <Button
          variant="outlined"
          color="primary"
          disabled={true}
          endIcon={<ArrowForwardIos />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UploadDataset;
