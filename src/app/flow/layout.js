import React from "react";
import StepperComp from "@/components/Stepper";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        height: "calc(100vh - 70px)",
        backgroundColor: "primary.main",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StepperComp steps={["Upload Dataset", "Preprocessing", "Model"]} />
      {children}
    </div>
  );
};

export default Layout;
