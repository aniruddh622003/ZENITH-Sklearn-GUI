import React from "react";
import StepperComp from "@/components/Stepper";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        height: "calc(100vh - 70px)",
        background:
          "radial-gradient(circle,rgba(104, 228, 152, 0.4),rgba(255, 255, 255, 1))",
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
