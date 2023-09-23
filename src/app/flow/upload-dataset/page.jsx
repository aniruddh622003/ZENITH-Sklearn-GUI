"use client";
import UploadIcon from '@mui/icons-material/Upload';
import { ArrowForwardIos } from "@mui/icons-material";
import Upload from "@/components/Upload";
import React from "react";
import styles from "./index.module.css";
import { Button } from '@mui/material';

const UploadDataset = () => {
  const upload = (file) => {
    console.log(file);
  };

  return (
    <div className={styles.page}>
      <head>
        <title>ZENiTH - Upload Dataset</title>
      </head>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>
            Upload Dataset <UploadIcon className={styles.icon} />
          </h1>
          <p className={styles.quote}>Data is a precious thing and will last longer than the systems themselves.</p>
          <p className={styles.quote}>- Tim Berners-Lee</p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.upload}>
          <Upload onSubmit={upload} />
        </div>
      </div>
      <div className={styles.next}>
        <Button variant="outlined" color="primary" endIcon={<ArrowForwardIos />}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default UploadDataset;
