import Upload from "@/components/Upload";
import React from "react";
import styles from "./index.module.css";

const UploadDataset = () => {
  return (
    <div>
      <h1>Upload Dataset</h1>
      <div className={`${styles.upload_wrapper}`}>
        <Upload />
      </div>
    </div>
  );
};

export default UploadDataset;
