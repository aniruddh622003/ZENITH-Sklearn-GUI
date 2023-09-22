"use client";
import Upload from "@/components/Upload";
import React from "react";
import styles from "./index.module.css";

const UploadDataset = () => {
  const upload = (file) => {
    console.log(file);
  };

  return (
    <div>
      <h1>Upload Dataset</h1>
      <div className={`${styles.upload_wrapper}`}>
        <Upload onSubmit={upload} />
        hello
      </div>
    </div>
  );
};

export default UploadDataset;
