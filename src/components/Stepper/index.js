"use client";
import React, { useEffect, useState } from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box, Button, Stepper, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const StepperComp = ({ steps }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (pathname === "/flow/upload-dataset") {
      setActiveStep(0);
    } else if (pathname === "/flow/preprocess") {
      setActiveStep(1);
    } else if (pathname === "/flow/model") {
      setActiveStep(2);
    } else {
      setActiveStep(0);
    }
  }, [pathname]);

  return (
    <Box>
      <Stepper activeStep={activeStep} style={{ padding: "30px 30px" }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperComp;
