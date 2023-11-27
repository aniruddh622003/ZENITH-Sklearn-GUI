"use client";
import React, { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./index.module.css";
import { Autocomplete, Box, Button, Collapse, TextField } from "@mui/material";

const Upload = ({ onSubmit }) => {
  const [readyToUpload, setReadyToUpload] = React.useState(false);
  const [outputColumn, setOutputColumn] = React.useState(null);
  const [outputOptions, setOutputOptions] = React.useState([]);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
  });

  const style = useMemo(() => {
    return `${styles.wrapper} ${isFocused ? styles.focused : ""} ${
      isDragAccept || acceptedFiles.length != 0 ? styles.accepted : ""
    } ${isDragReject ? styles.rejected : ""}
            `;
  }, [isFocused, isDragAccept, isDragReject, acceptedFiles]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      console.log(acceptedFiles[0]);
      let reader = new FileReader();
      reader.readAsText(acceptedFiles[0]);
      reader.onload = function () {
        let text = reader.result;
        let lines = text.split("\n");
        let headers = lines[0].split(",");
        let options = [];
        for (let i = 0; i < headers.length; i++) {
          options.push({ label: headers[i], value: i });
        }
        console.log(options);
        setOutputOptions(options);
      };
    }
  }, [acceptedFiles]);

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
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: "20px",
      }}
    >
      <div className={style}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files.
            <br />
            Upload Limit: 1. New files will overwrite older ones.
          </p>
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
      <Collapse sx={{ width: "100%" }} in={acceptedFiles.length != 0}>
        <Autocomplete
          fullWidth
          options={outputOptions}
          value={outputColumn}
          onChange={(event, newValue) => {
            setOutputColumn(newValue);
            setReadyToUpload(true);
          }}
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              label="Please Select the Output Column"
            />
          )}
        ></Autocomplete>
      </Collapse>
      <Button
        variant="contained"
        disabled={!readyToUpload}
        onClick={() => onSubmit(acceptedFiles[0], outputColumn.label)}
      >
        Upload
      </Button>
    </Box>
  );
};

export default Upload;
