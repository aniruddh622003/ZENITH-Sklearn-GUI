"use client";
import React, { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./index.module.css";

const Upload = () => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone();

  useEffect(() => {
    console.log(acceptedFiles);
  }, [acceptedFiles]);

  const style = useMemo(
    () =>
      `${styles.wrapper} ${isFocused ? styles.focused : ""} ${
        isDragAccept ? styles.accept : ""
      } ${isDragReject ? styles.reject : ""}
            `,
    [isFocused, isDragAccept, isDragReject]
  );

  const getFileSize = (size) => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size >= 1024 && size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    } else if (size >= 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    } else {
      return `${size} bytes`;
    }
  };

  return (
    <div className={style}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4 style={{ marginTop: "20px" }}>Uploaded File details</h4>
        <ul>
          {acceptedFiles.map((file) => (
            <p key={file.path}>
              Name: {file.name} <br />
              Size: {getFileSize(file.size)} <br />
              Type: {file.type}
            </p>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Upload;
