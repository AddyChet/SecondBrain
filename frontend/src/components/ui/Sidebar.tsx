import React from "react";

export interface SideBarButton {
  variant: "default";
  startIcon: React.ReactElement;
  text: string;
  size: "sm" | "md" | "lg";
  className?: string;
  onClick: () => void;
}

export const SideBarButton: React.FC<SideBarButton> = (props) => {
  const { variant, startIcon, text, size, onClick, className } = props;

  const variantClass =
    variant === "default"
      ? "text-black hover:scale-105 sm:hover:scale-110 transition-all duration-200 ease-in-out hover:text-button-500 hover:shadow-lg rounded-lg"
      : "";

  const sizeClass = `
    px-3 py-2 text-sm 
    sm:px-4 sm:py-3 sm:text-base 
    lg:px-6 lg:py-4 lg:text-lg 
    xl:px-8 xl:py-5 xl:text-xl
  `;

  return (
    <button
      className={`flex items-center justify-start gap-3 cursor-pointer w-full shadow-indigo-200 
        ${variantClass} ${sizeClass} ${className ?? ""} 
        transition-all duration-300 ease-in-out`}
      onClick={onClick}
    >
      {startIcon} {text}
    </button>
  );
};
