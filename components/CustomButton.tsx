// *********************
// Role of the component: Custom button component
// Name of the component: CustomButton.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CustomButton paddingX={paddingX} paddingY={paddingY} text={text} buttonType={buttonType} customWidth={customWidth} textSize={textSize} />
// Input parameters: CustomButtonProps interface
// Output: custom button component
// *********************

import React from "react";

interface CustomButtonProps {
  paddingX: number;
  paddingY: number;
  text: string;
  buttonType: "submit" | "reset" | "button";
  customWidth: string;
  textSize: string;
}

const CustomButton = ({
  paddingX,
  paddingY,
  text,
  buttonType,
  customWidth,
  textSize
}: CustomButtonProps) => {


  return (
    <button
      type={`${buttonType}`}
      className={`${customWidth !== "no" && `w-${customWidth}`} uppercase bg-white px-${paddingX} py-${paddingY} text-${textSize} w-full bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-[0.2em]  shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
