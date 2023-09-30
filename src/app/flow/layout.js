import React from "react";
import StepperComp from "@/components/Stepper";

const Layout = ({ children }) => {
  return (
    <div>
      <StepperComp steps={["Upload Dataset", "Preprocessing", "Model"]} />
      <br />
      {children}
    </div>
  );
};

export default Layout;
